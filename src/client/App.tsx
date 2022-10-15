import React, { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { Game } from '../server/Game/Game';

export function App() {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const ioSocket = io('http://localhost:3000');

        setSocket(ioSocket);
    }, []);

    useEffect(() => {
        // socket?.on('game', (data) => {
        //     console.log(data);
        //
        //
        //     window.game = data;
        // });
        // @ts-ignore
        window.game = new Game();
    }, []);

    const onClick = useCallback(() => {
        socket?.emit('game');
    }, [socket]);

    return (
        <button type="button" onClick={onClick}>
            Update
        </button>
    );
}
