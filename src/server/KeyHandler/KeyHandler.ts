import { Socket } from 'socket.io';

import { Game } from '../Game/Game';

type Keys = 'ArrowLeft' | 'ArrowUp' | 'ArrowRight' | 'ArrowDown';

export const keyHandler = (socket: Socket, game: Game) => {
    socket.on('keydown', (key: Keys) => {
        switch (key) {
            case 'ArrowLeft': {
                game.movePieceLeft();
                break;
            }
            case 'ArrowRight': {
                game.movePieceRight();
                break;
            }
            case 'ArrowUp': {
                game.rotatePiece();
                break;
            }
            case 'ArrowDown': {
                game.movePieceDown();
                break;
            }
            default: {
                break;
            }
        }
        socket.emit('game-state', game.getState());
    });
};
