import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

import { getPlayfieldSizes } from '../../utils/getPlayfieldSizes';
import { COLS } from '../../../utils/constants';
import { GameStatusType } from '../../../models/game';

interface GameScreenProps {
    gameStatus: GameStatusType;
    height: number;
}

const Container = styled.div<{ width: number; height: number; opacity: number }>`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: content-box;
    border: 5px solid white;

    ${({ width, height, opacity }) => css`
        width: ${width}px;
        height: ${height}px;
        background: rgba(0, 0, 0, ${opacity});
    `}
`;

export function GameScreen({ gameStatus, height }: GameScreenProps) {
    const [width] = useMemo(() => getPlayfieldSizes(height, COLS), [height]);
    const text = useMemo(() => {
        switch (gameStatus) {
            case 'start': {
                return <div>Press ENTER to Start</div>;
            }
            case 'pause': {
                return <div>Pause</div>;
            }
            case 'over': {
                return <div>Game over</div>;
            }
            case 'waitForHost': {
                return <div>Wait for the host to start the game</div>;
            }
            default: {
                return null;
            }
        }
    }, [gameStatus]);

    return (
        <Container width={width} height={height} opacity={gameStatus === 'playing' ? 0 : 0.8}>
            {text}
        </Container>
    );
}
