import { Socket } from 'socket.io';

import { Game } from '../Game/Game';
import { SocketEvents } from '../../models/events';

type Keys = 'ArrowLeft' | 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'Enter' | 'Escape' | 'Space';

export class Controller {
    private socket: Socket;
    private game: Game;
    private intervalId: NodeJS.Timer | null;

    constructor(socket: Socket, game: Game) {
        this.socket = socket;
        this.game = game;
        this.intervalId = null;

        this.handleKeydown();
        this.handleKeyup();
    }

    update() {
        this.game.movePieceDown();
        this.sendGameState();
    }

    sendGameState() {
        this.socket.emit(SocketEvents.GAME_STATE, this.game.getState());
    }

    handleKeydown() {
        this.socket.on(SocketEvents.KEYDOWN, (key: Keys) => {
            const { gameStatus } = this.game.getState();
            const isPlaying = gameStatus === 'playing';
            const isGameOver = gameStatus === 'over';

            switch (key) {
                case 'ArrowLeft': {
                    if (isPlaying) {
                        this.game.movePieceLeft();
                    }
                    break;
                }
                case 'ArrowRight': {
                    if (isPlaying) {
                        this.game.movePieceRight();
                    }
                    break;
                }
                case 'ArrowUp': {
                    if (isPlaying) {
                        this.game.rotatePiece();
                    }
                    break;
                }
                case 'Space': {
                    if (isPlaying) {
                        this.stopTimer();
                        this.game.hardDrop(this.sendGameState);
                    }
                    break;
                }
                case 'ArrowDown': {
                    if (isPlaying) {
                        this.game.movePieceDown();
                        this.stopTimer();
                    }
                    break;
                }
                case 'Enter': {
                    if (isGameOver) {
                        this.game.reset();
                    }
                    this.game.updateGameStatus('playing');
                    this.startTimer();
                    break;
                }
                case 'Escape': {
                    if (isGameOver) {
                        break;
                    }
                    this.game.updateGameStatus('pause');
                    this.stopTimer();
                    break;
                }
                default: {
                    break;
                }
            }

            if (isPlaying && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(key)) {
                this.sendGameState();
            } else if (['Escape', 'Enter'].includes(key)) {
                this.sendGameState();
            }
        });
    }

    handleKeyup() {
        this.socket.on(SocketEvents.KEYUP, (key: Keys) => {
            const { gameStatus } = this.game.getState();
            const isPlaying = gameStatus === 'playing';

            switch (key) {
                case 'Space':
                case 'ArrowDown': {
                    if (isPlaying) {
                        this.startTimer();
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        });
    }

    startTimer() {
        const speed = 1000 - this.game.getState().level * 100;

        if (!this.intervalId) {
            this.intervalId = setInterval(
                () => {
                    this.update();
                },
                speed > 0 ? speed : 100,
            );
        }
    }

    stopTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
