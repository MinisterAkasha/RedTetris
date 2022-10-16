import { Piece } from '../server/Piece/Piece';

import { PieceShape } from './piese';

export type GameStatusType = 'start' | 'pause' | 'over' | 'playing';

export interface GameState {
    playfield: PieceShape;
    score: number;
    level: number;
    nextPiece: Piece;
    gameStatus: GameStatusType;
}
