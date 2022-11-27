import { PieceType, PieceShape } from '../../models/piese';
import { COLS } from '../../utils/constants';

const { T, O, S, J, L, Z, I } = PieceType;

const typeToBlocks: Record<PieceType, PieceShape> = {
    [PieceType.T]: [
        [0, 0, 0],
        [T, T, T],
        [0, T, 0],
    ],
    [PieceType.O]: [
        [0, 0, 0, 0],
        [0, O, O, 0],
        [0, O, O, 0],
        [0, 0, 0, 0],
    ],
    [PieceType.J]: [
        [0, 0, 0],
        [J, J, J],
        [0, 0, J],
    ],
    [PieceType.L]: [
        [0, 0, 0],
        [L, L, L],
        [L, 0, 0],
    ],
    [PieceType.S]: [
        [0, 0, 0],
        [0, S, S],
        [S, S, 0],
    ],
    [PieceType.Z]: [
        [0, 0, 0],
        [Z, Z, 0],
        [0, Z, Z],
    ],
    [PieceType.I]: [
        [0, 0, 0, 0],
        [I, I, I, I],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
};

export class Piece {
    readonly type: PieceType;
    blocks: PieceShape;
    prevState: PieceShape;
    x: number;
    y: number;

    constructor(type: PieceType) {
        this.type = type;
        this.blocks = typeToBlocks[this.type];
        this.prevState = this.blocks;
        this.x = Math.floor((COLS - this.blocks.length) / 2);
        this.y = -1;
    }

    rotate() {
        const { blocks } = this;
        this.prevState = blocks;

        this.blocks = blocks[0].map((_, index) => blocks.map((row) => row[index]).reverse());
    }

    rotateBack() {
        this.blocks = this.prevState;
    }
}
