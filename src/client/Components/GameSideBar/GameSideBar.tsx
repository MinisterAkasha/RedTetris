import React from 'react';
import styled from 'styled-components';

import { GameState } from '../../../models/game';
import { Block } from '../Block/Block';
import { BlocksGrid } from '../Playfield/Playfield';

type GameSideBarProps = Omit<GameState, 'playfield'>;

const StyledSideBar = styled.div<{ opacity: number }>`
    position: relative;
    color: white;
    background: black;
    border: 5px solid white;
    border-left: none;
    box-sizing: content-box;
    padding: 20px;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        ${({ opacity }) => `background: rgba(0, 0, 0, ${opacity});`};
    }
`;

export function GameSideBar({ level, score, nextPiece, gameStatus }: GameSideBarProps) {
    return (
        <StyledSideBar opacity={gameStatus === 'playing' ? 0 : 0.8}>
            <div>Level: {level}</div>
            <div>Score: {score}</div>
            <div>Next:</div>
            <BlocksGrid width={120} blockSize={30} cols={4} rows={2}>
                {nextPiece.blocks.map((row, y) => {
                    return row.map((type, x) => {
                        if (typeof type === 'number') {
                            return null;
                        }

                        return <Block type={type} size={30} position={{ y: y - 1, x }} />;
                    });
                })}
            </BlocksGrid>
        </StyledSideBar>
    );
}

export default GameSideBar;
