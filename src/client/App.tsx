import React, { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { Game } from '../server/Game/Game';

import Playfield from './Components/Playfield/Playfield';
import { GlobalStyle } from './Components/GlobalStyled/GlobalStyled';

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
    const [gameState, setGameState] = useState<any>(null);

    useEffect(() => {
        const ioSocket = io('http://localhost:3000');

        setSocket(ioSocket);
    }, []);

    useEffect(() => {
        const keyHandler = (event: KeyboardEvent) => {
            socket?.emit('keydown', event.code);
        };

        document.addEventListener('keydown', keyHandler);

        return () => {
            document.removeEventListener('keydown', keyHandler);
        };
    }, [socket]);

    useEffect(() => {
        socket?.on('game-state', setGameState);
    }, [socket]);

    useEffect(() => {
        // @ts-ignore
        window.game = new Game();
    }, []);

    const onClick = useCallback(() => {
        socket?.emit('game');
    }, [socket]);

    return (
        <>
            <GlobalStyle />
            <button type="button" onClick={onClick}>
                Update
            </button>
            {gameState && <Playfield state={gameState} height={750} />}
        </>
    );
}
