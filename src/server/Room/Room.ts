import { Socket } from 'socket.io';

import { ModeType, RoomType } from '../../models/room';
import { User } from '../User/User';
import { Game } from '../Game/Game';

export class Room {
    readonly host: string;
    readonly limit: number;
    readonly mode: ModeType;
    readonly usersCount: number;
    private users: User[];
    readonly socket: Socket;

    constructor({ host, limit, mode }: RoomType, socket: Socket) {
        this.host = host;
        this.limit = limit;
        this.mode = mode;
        this.usersCount = 1;
        this.users = [];
        this.socket = socket;
    }

    connect(user: User) {
        if (this.users.length < this.limit) {
            this.users.push(user);
        }

        if (user.name === this.host && !user.game) {
            user.game = new Game();
        }
    }

    disconnect(user: User) {
        // TODO проверка на хоста -> что дальше?
        this.users = this.users.filter((u) => u.id !== user.id);
        user.game = null;
    }

    startGame() {
        this.users.forEach((user) => {
            if (!user.game) {
                user.game = new Game();
            }
        });
    }

    getState() {
        return {
            host: this.host,
            limit: this.limit,
            mode: this.mode,
            usersCount: this.users.length,
        };
    }
}
