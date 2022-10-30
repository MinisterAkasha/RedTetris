import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import Playfield from '../Playfield/Playfield';
import GameSideBar from '../GameSideBar/GameSideBar';
import { GameState } from '../../../models/game';
import { GameScreen } from '../GameSceen/GameScreen';
import { useStores } from '../../store/store';
import { SocketEvents } from '../../../models/events';

interface GameProps {
    height: number;
}

const Container = styled.div`
    position: relative;
`;

function Game({ height }: GameProps) {
    const { socketStore } = useStores();
    const { pathname } = useLocation();

    const hostName = useMemo(() => {
        return (pathname.match(/(?<=\[).+?(?=\])/g) || [])[0];
    }, [pathname]);

    console.log('hostName', hostName);
    const [gameState, setGameState] = useState<GameState | null>(null);

    useEffect(() => {
        if (!hostName) {
            return;
        }
        socketStore.socket.emit(SocketEvents.JOIN_ROOM, hostName);

        return () => {
            socketStore.socket.emit(SocketEvents.LEAVE_ROOM, hostName);
        };
    }, [hostName, socketStore.socket]);

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            socketStore.socket.emit(SocketEvents.KEYDOWN, event.code);
        };
        const keyUpHandler = (event: KeyboardEvent) => {
            socketStore.socket.emit(SocketEvents.KEYUP, event.code);
        };

        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
        };
    }, [socketStore.socket]);

    useEffect(() => {
        socketStore.socket.on(SocketEvents.GAME_STATE, setGameState);
    }, [socketStore.socket]);

    return (
        <Container>
            <GameScreen gameStatus={gameState?.gameStatus || 'start'} height={height} />
            {gameState && (
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Playfield state={gameState} height={height} />
                    <GameSideBar
                        score={gameState.score}
                        level={gameState.level}
                        nextPiece={gameState.nextPiece}
                        gameStatus={gameState.gameStatus}
                    />
                </div>
            )}
        </Container>
    );
}

export default Game;
