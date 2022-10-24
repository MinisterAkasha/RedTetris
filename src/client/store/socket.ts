import { makeAutoObservable } from 'mobx';
import { io, Socket as SocketType } from 'socket.io-client';

interface ISocket {
    setSocket: (socket: SocketType) => void;
}

export class SocketStore implements ISocket {
    socket: SocketType = io('http://localhost:3000');

    constructor() {
        makeAutoObservable(this);
    }

    setSocket(socket: SocketType) {
        this.socket = socket;
    }
}
