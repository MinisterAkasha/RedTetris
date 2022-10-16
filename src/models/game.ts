import { Piece } from '../server/Piece/Piece';

import { PieceShape } from './piese';

export interface GameState {
    playfield: PieceShape;
    score: number;
    level: number;
    nextPiece: Piece;
}
