import { Socket } from 'socket.io';

import { ModeType, RoomType } from '../../models/room';
import { User } from '../User/User';

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

    addUser(user: User) {
        if (this.users.length < this.limit) {
            this.users.push(user);
        }
    }

    removeUser(user: User) {
        this.users = this.users.filter((u) => u.id !== user.id);
    }

    startGame() {}

    getState() {
        return {
            host: this.host,
            limit: this.limit,
            mode: this.mode,
            usersCount: this.users.length,
        };
    }

    // disconnect(name: string) {
    //
    // }
}
