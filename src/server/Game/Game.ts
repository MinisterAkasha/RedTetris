import { Piece } from '../Piece/Piece';
import { PieceTypeEnum } from '../../models/piese';

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
    private playfield: number[][];
    private activePiece: Piece;

    constructor() {
        this.playfield = this.createPlayfield();
        this.activePiece = new Piece(PieceTypeEnum.T);
    }

    createPlayfield() {
        return Array.from(Array(20), () => new Array(10).fill(0));
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

    loop<T>(arr: number[][], callback: (y: number, x: number) => T, targetValue?: T) {
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
