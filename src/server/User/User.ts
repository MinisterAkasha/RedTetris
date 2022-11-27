/* eslint @typescript-eslint/naming-convention: 0*/
import { Socket } from 'socket.io';

import { Game } from '../Game/Game';
import { Controller } from '../Controller/Controller';

interface UserRoomStatus {
    connected: boolean;
    isHost: boolean;
}

export class User {
    // @ts-ignore
    private controller: Controller | null;
    private _game: Game | null;
    readonly socket: Socket;
    private _name: string | null;
    readonly id: string;
    private _roomStatus: UserRoomStatus;

    constructor(socket: Socket, id: string) {
        this._name = null;
        this.socket = socket;
        this.id = id;
        this._game = null;
        this.controller = null;
        this._roomStatus = { connected: false, isHost: false };
    }

    set game(game: Game | null) {
        this._game = game;

        if (game === null) {
            this.controller = null;
        } else {
            this.controller = new Controller(this.socket, this._game as Game);
        }
    }

    get game() {
        return this._game;
    }

    set name(name: string) {
        this._name = name;
    }

    get name() {
        return this._name as string;
    }

    get roomStatus(): UserRoomStatus {
        return this._roomStatus;
    }

    set roomStatus(value: UserRoomStatus) {
        this._roomStatus = value;
    }
}

/* eslint @typescript-eslint/naming-convention: 1*/
