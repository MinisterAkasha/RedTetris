import { Socket } from 'socket.io';

import { Game } from '../Game/Game';
import { Controller } from '../Controller/Controller';

export class User {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private _game: Game | null;
    // @ts-ignore
    private controller: Controller | null;
    readonly socket: Socket;
    readonly name: string;
    readonly id: string;

    constructor(socket: Socket, name: string, id: string) {
        this.name = name;
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
}
