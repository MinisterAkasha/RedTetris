import { PieceType, PieceShape } from '../../models/piese';

const { T, O, S, J, L, Z, I } = PieceType;

const typeToBlocks: Record<PieceType, PieceShape> = {
    [PieceType.T]: [
        [0, T, 0],
        [T, T, T],
        [0, 0, 0],
    ],
    [PieceType.O]: [
        [O, O],
        [O, O],
    ],
    [PieceType.S]: [
        [0, S, 0],
        [S, S, S],
        [0, 0, 0],
    ],
    [PieceType.J]: [
        [0, J, 0],
        [J, J, J],
        [0, 0, 0],
    ],
    [PieceType.L]: [
        [0, L, 0],
        [L, L, L],
        [0, 0, 0],
    ],
    [PieceType.Z]: [
        [0, Z, 0],
        [Z, Z, Z],
        [0, 0, 0],
    ],
    [PieceType.I]: [
        [0, I, 0],
        [I, I, I],
        [0, 0, 0],
    ],
};

export class Piece {
    readonly type: PieceType;
    blocks: PieceShape;
    x: number;
    y: number;

    constructor(type: PieceType) {
        this.type = type;
        this.x = 0;
        this.y = 0;
        this.blocks = typeToBlocks[this.type];
    }
}
