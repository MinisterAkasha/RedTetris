import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { Route, Routes } from 'react-router-dom';

import { GlobalStyle } from './Components/GlobalStyled/GlobalStyled';
import Game from './Components/Game/Game';
import { HomePage } from './Components/HomePage/HomePage';
import { useStores } from './store/store';

export function App() {
    const {
        socketStore: { setSocket, socket },
    } = useStores();

    useEffect(() => {
        if (socket) {
            return;
        }

        const ioSocket = io('http://localhost:3000');

        setSocket(ioSocket);
    }, [setSocket, socket]);

    return (
        <>
            <GlobalStyle />
            {!socket ? (
                'Loading...'
            ) : (
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/:roomName" element={<Game height={750} />} />
                </Routes>
            )}
        </>
    );
}
