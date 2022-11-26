/* eslint @typescript-eslint/naming-convention: 0*/
import { Socket } from 'socket.io';

import { Game } from '../Game/Game';
import { Controller } from '../Controller/Controller';

export class User {
    // @ts-ignore
    private controller: Controller | null;
    private _game: Game | null;
    readonly socket: Socket;
    private _name: string | null;
    readonly id: string;

    constructor(socket: Socket, id: string) {
        this._name = null;
        this.socket = socket;
        this.id = id;
        this._game = null;
        this.controller = null;
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
}

/* eslint @typescript-eslint/naming-convention: 1*/
