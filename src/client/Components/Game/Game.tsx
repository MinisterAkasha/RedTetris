import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Playfield from '../Playfield/Playfield';
import GameSideBar from '../GameSideBar/GameSideBar';
import { GameState } from '../../../models/game';
import { GameScreen } from '../GameSceen/GameScreen';
import { useStores } from '../../store/store';

interface GameProps {
    height: number;
}

const Container = styled.div`
    position: relative;
`;

function Game({ height }: GameProps) {
    const { socketStore } = useStores();
    const [gameState, setGameState] = useState<GameState | null>(null);

    useEffect(() => {});

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            socketStore.socket.emit('keydown', event.code);
        };
        const keyUpHandler = (event: KeyboardEvent) => {
            socketStore.socket.emit('keyup', event.code);
        };

        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
        };
    }, [socketStore.socket]);

    useEffect(() => {
        socketStore.socket.on('game-state', setGameState);
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
