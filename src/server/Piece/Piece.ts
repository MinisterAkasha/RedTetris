import { PieceTypeEnum } from '../../models/piese';

const typeToBlocks: Record<PieceTypeEnum, number[][]> = {
    [PieceTypeEnum.T]: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [PieceTypeEnum.O]: [
        [1, 1],
        [1, 1],
    ],
    [PieceTypeEnum.S]: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [PieceTypeEnum.J]: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [PieceTypeEnum.L]: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [PieceTypeEnum.Z]: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [PieceTypeEnum.I]: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
};

export class Piece {
    readonly type: PieceTypeEnum;
    blocks: number[][];
    x: number;
    y: number;

    constructor(type: PieceTypeEnum) {
        this.type = type;
        this.x = 0;
        this.y = 0;
        this.blocks = typeToBlocks[this.type];
    }
}
