import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import Playfield from '../Playfield/Playfield';
import GameSideBar from '../GameSideBar/GameSideBar';
import { GameState } from '../../../models/game';
import { GameScreen } from '../GameSceen/GameScreen';
import { useStores } from '../../store/store';
import { SocketEvents } from '../../../models/events';
import { useGameKeyHandler } from '../../hooks/useGameKeyHandler';

interface GameProps {
    height: number;
}

const Container = styled.div`
    position: relative;
`;

function Game({ height }: GameProps) {
    const { socketStore } = useStores();
    const { pathname } = useLocation();
    useGameKeyHandler();

    const hostName = useMemo(() => {
        return (pathname.match(/(?<=\[).+?(?=\])/g) || [])[0];
    }, [pathname]);

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
        socketStore.socket.on(SocketEvents.GAME_STATE, (data) => {
            setGameState(data);
        });
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
