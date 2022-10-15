import { Piece } from '../Piece/Piece';
import { PieceType, PieceShape } from '../../models/piese';

// const a = [
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// ];

export class Game {
    // @ts-ignore
    private playfield: PieceShape;
    private activePiece: Piece;

    constructor() {
        this.playfield = this.create2DArray(20, 10);
        this.activePiece = new Piece(PieceType.T);
    }

    create2DArray(rows: number, cols: number) {
        return Array.from(Array(rows), () => new Array(cols).fill(0));
    }

    movePieceLeft = () => {
        this.activePiece.x -= 1;

        if (this.hasCollision()) {
            this.activePiece.x += 1;
        }
    };

    movePieceRight = () => {
        this.activePiece.x += 1;

        if (this.hasCollision()) {
            this.activePiece.x -= 1;
        }
    };

    movePieceDown = () => {
        this.activePiece.y += 1;

        if (this.hasCollision()) {
            this.activePiece.y -= 1;
            this.lockPiece();
        }
    };

    // TODO сделать wall jump
    rotatePiece() {
        const { blocks } = this.activePiece;

        this.activePiece.blocks = blocks[0].map((_, index) => blocks.map((row) => row[index]).reverse());

        if (this.hasCollision()) {
            this.activePiece.blocks = blocks;
        }
    }

    hasCollision() {
        const { x: pieceX, y: pieceY, blocks } = this.activePiece;

        return this.loop(
            blocks,
            (x, y) => {
                return (
                    blocks[y][x] &&
                    (this.playfield[pieceY + y] === undefined ||
                        this.playfield[pieceY + y][pieceX + x] === undefined ||
                        this.playfield[pieceY + y][pieceX + x] !== 0)
                );
            },
            true,
        );
    }

    lockPiece() {
        const { x: pieceX, y: pieceY, blocks } = this.activePiece;

        this.loop(blocks, (x, y) => {
            if (blocks[y][x]) {
                this.playfield[pieceY + y][pieceX + x] = blocks[y][x];
            }
        });
    }

    getState() {
        const playfield = this.create2DArray(20, 10);
        const { x: pieceX, y: pieceY, blocks } = this.activePiece;

        this.loop(this.playfield, (y, x) => {
            playfield[y][x] = this.playfield[y][x];
        });

        this.loop(blocks, (y, x) => {
            if (blocks[y][x]) {
                playfield[pieceY + y][pieceX + x] = blocks[y][x];
            }
        });

        return {
            playfield,
        };
    }

    loop<T>(arr: any[][], callback: (y: number, x: number) => T, targetValue?: T) {
        let result: any;

        for (let y = 0; y < arr.length; y++) {
            for (let x = 0; x < arr[y].length; x++) {
                result = callback(y, x);

                if (targetValue && result === targetValue) {
                    return result;
                }
            }
        }

        return result;
    }
}
