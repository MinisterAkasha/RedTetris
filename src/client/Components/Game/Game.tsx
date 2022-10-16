import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';

import Playfield from '../Playfield/Playfield';
import GameSideBar from '../GameSideBar/GameSideBar';
import { GameState } from '../../../models/game';
import { GameScreen } from '../GameSceen/GameScreen';

interface GameProps {
    height: number;
    socket: Socket;
}

const Container = styled.div`
    position: relative;
`;

function Game({ height, socket }: GameProps) {
    const [gameState, setGameState] = useState<GameState | null>(null);

    useEffect(() => {});

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            socket.emit('keydown', event.code);
        };
        const keyUpHandler = (event: KeyboardEvent) => {
            socket.emit('keyup', event.code);
        };

        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
        };
    }, [socket]);

    useEffect(() => {
        socket.on('game-state', setGameState);
    }, [socket]);

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
