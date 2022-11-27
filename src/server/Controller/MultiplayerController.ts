import { io } from '../app';
import { User } from '../User/User';
import { SocketEvents } from '../../models/events';
import { GameState } from '../../models/game';

export interface OtherPlayerGameState {
    name: string;
    gameState: GameState | null;
}

export class MultiplayerController {
    readonly roomName: string;
    private players: User[];

    constructor(players: User[], roomName: string) {
        this.roomName = roomName;
        this.players = players;
    }

    sendData() {
        const data = this.players.reduce((acc, curr) => {
            acc.push({ name: curr.name, gameState: curr.game?.getState() || null });

            return acc;
        }, [] as OtherPlayerGameState[]);

        io.to(this.roomName).emit(SocketEvents.OTHER_PLAYER_GAME_STATE, data);
    }

    updateUsers(players: User[]) {
        this.players = players;
    }
}
