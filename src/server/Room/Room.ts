import { ModeType, RoomType } from '../../models/room';
import { User } from '../User/User';
import { Game } from '../Game/Game';
import { SocketEvents } from '../../models/events';

interface RoomProps extends Pick<RoomType, 'limit' | 'mode'> {
    host: User;
}

export class Room {
    readonly host: User;
    readonly limit: number;
    readonly mode: ModeType;
    readonly usersCount: number;
    private users: User[];

    constructor({ host, limit, mode }: RoomProps) {
        this.host = host;
        this.limit = limit;

        this.mode = mode;
        this.usersCount = 1;
        this.users = [];
    }

    connect(user: User) {
        if (this.users.length < this.limit) {
            this.users.push(user);
        }

        if (!user.game) {
            user.game = new Game(user === this.host ? 'host' : 'player');
            user.roomStatus = { connected: true, isHost: user === this.host };
            user.socket.emit(SocketEvents.GAME_STATE, user?.game?.getState());
        }
    }

    disconnect(user: User) {
        // TODO проверка на хоста -> что дальше?
        this.users = this.users.filter((u) => u.id !== user.id);
        user.game = null;
        user.roomStatus = { connected: false, isHost: false };
    }

    startGame() {
        // this.users.forEach((user) => {
        // if (!user.game) {
        //     user.game = new Game('player');
        // }
        // });
    }

    getState() {
        return {
            host: this.host.name,
            limit: this.limit,
            mode: this.mode,
            usersCount: this.users.length,
        };
    }
}
