import React, { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { GlobalStyle } from './Components/GlobalStyled/GlobalStyled';
import Game from './Components/Game/Game';

// @ts-ignore
const state = [
    ['O', 'O', 0, 0, 0, 0, 0, 0, 0, 'I'],
    ['O', 'O', 0, 0, 0, 0, 0, 0, 0, 'I'],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 'I'],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 'I'],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 'Z', 'Z', 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 'Z', 'Z', 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 'S', 'S', 0, 0],
    [0, 0, 0, 0, 0, 'S', 'S', 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 'L', 0, 0, 0, 0, 0],
    [0, 0, 'L', 'L', 'L', 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 'T', 0, 0, 0, 0, 0, 'J', 0, 0],
    ['T', 'T', 'T', 0, 0, 0, 0, 'J', 'J', 'J'],
];

export function App() {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const ioSocket = io('http://localhost:3000');

        setSocket(ioSocket);
    }, []);

    // @ts-ignore
    const onClick = useCallback(() => {
        socket?.emit('game');
    }, [socket]);

    return (
        <>
            <GlobalStyle />
            {socket && <Game height={750} socket={socket} />}
        </>
    );
}
