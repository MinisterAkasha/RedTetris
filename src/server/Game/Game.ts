import { Piece } from '../Piece/Piece';
import { PieceType, PieceShape as PlayfieldType } from '../../models/piese';
import { COLS, ROWS } from '../../utils/constants';
import { GameStatusType } from '../../models/game';

type GameRole = 'host' | 'player';

export class Game {
    static points = [40, 100, 300, 1200];
    private playfield: PlayfieldType;
    private activePiece: Piece;
    private nextPiece: Piece;
    score: number;
    lines: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private _level: number;
    gameStatus: GameStatusType;

    constructor(role: GameRole) {
        this.playfield = this.create2DArray(ROWS, COLS);
        this.activePiece = this.createPiece();
        this.nextPiece = this.createPiece();
        this.lines = 0;
        this.score = 0;
        this._level = 0;
        this.gameStatus = role === 'host' ? 'start' : 'waitForHost';
    }

    // TODO добавить систему уровней по времени
    get level(): number {
        return Math.floor(this.lines * 0.1);
    }

    set level(value: number) {
        this._level = value;
    }

    reset() {
        this.playfield = this.create2DArray(ROWS, COLS);
        this.activePiece = this.createPiece();
        this.nextPiece = this.createPiece();
        this.lines = 0;
        this.score = 0;
        this._level = 0;
        this.gameStatus = 'start';
    }

    create2DArray(rows: number, cols: number) {
        return Array.from(Array(rows), () => new Array(cols).fill(0));
    }

    createPiece() {
        const index = Math.floor(Math.random() * 7);
        const type = Object.keys(PieceType)[index] as PieceType;

        return new Piece(type);
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
        if (this.gameStatus === 'over') {
            return;
        }

        this.activePiece.y += 1;

        if (this.hasCollision()) {
            this.activePiece.y -= 1;
            this.lockPiece();
            this.updatePiece();
            const lines = this.clearLines();
            this.updateScore(lines);
        }

        if (this.hasCollision()) {
            this.updateGameStatus('over');
        }
    };

    hardDrop(callback?: VoidFunction) {
        const { activePiece } = this;

        while (activePiece === this.activePiece) {
            this.movePieceDown();
            callback?.();
        }
    }

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

    clearLines() {
        const lines = [];

        for (let y = ROWS - 1; y >= 0; y--) {
            let blocksCount = 0;

            for (let x = 0; x < COLS; x++) {
                if (this.playfield[y][x]) {
                    blocksCount++;
                }
            }

            if (!blocksCount) {
                break;
            } else if (blocksCount === COLS) {
                lines.unshift(y);
            }
        }

        for (const index of lines) {
            this.playfield.splice(index, 1);
            this.playfield.unshift(new Array(COLS).fill(0));
        }

        return lines.length;
    }

    updateScore(lines: number) {
        if (lines > 0) {
            this.score += Game.points[lines] * (this._level + 1);
            this.lines += lines;
        }
    }

    updateGameStatus(newGameStatus: GameStatusType) {
        this.gameStatus = newGameStatus;
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
            level: this.level,
            score: this.score,
            nextPiece: this.nextPiece,
            gameStatus: this.gameStatus,
        };
    }

    updatePiece() {
        this.activePiece = this.nextPiece;
        this.nextPiece = this.createPiece();
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
