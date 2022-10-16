import { Socket } from 'socket.io';

import { Game } from '../Game/Game';

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
        this.socket.emit('game-state', this.game.getState());
    }

    handleKeydown() {
        this.socket.on('keydown', (key: Keys) => {
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
                case 'ArrowDown': {
                    if (isPlaying) {
                        this.game.movePieceDown();
                        this.startTimer();
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
                this.socket.emit('game-state', this.game.getState());
            } else if (['Escape', 'Enter'].includes(key)) {
                this.socket.emit('game-state', this.game.getState());
            }
        });
    }

    handleKeyup() {
        this.socket.on('keyup', (key: Keys) => {
            const { gameStatus } = this.game.getState();
            const isPlaying = gameStatus === 'playing';

            switch (key) {
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
