import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

import { Block } from '../Block/Block';
import { GameState } from '../../../models/game';
import { COLS, ROWS } from '../../../utils/constants';
import { getPlayfieldSizes } from '../../utils/getPlayfieldSizes';

interface PlayfieldSizeProps {
    width: number;
    blockSize: number;
    cols: number;
    rows: number;
}

export const BlocksGrid = styled.div<PlayfieldSizeProps>`
    display: grid;

    ${({ cols, rows, width, blockSize }) => css`
        width: ${width}px;
        grid-template-columns: repeat(${cols}, ${blockSize}px);
        grid-template-rows: repeat(${rows}, ${blockSize}px);
    `}
`;

const StyledPlayfield = styled(BlocksGrid)`
    box-sizing: content-box;
    border: 5px solid white;
    background: black;
`;

export interface PlayfieldProps {
    height: number;
    state: GameState;
}

function Playfield({ state, height }: PlayfieldProps) {
    const [width, blockSize] = useMemo(() => getPlayfieldSizes(height, COLS), [height]);

    return (
        <StyledPlayfield width={width} blockSize={blockSize} cols={COLS} rows={ROWS}>
            {state.playfield.map((row, y) => {
                return row.map((type, x) => {
                    if (typeof type === 'number') {
                        return null;
                    }

                    return <Block type={type} size={blockSize} position={{ x, y }} />;
                });
            })}
        </StyledPlayfield>
    );
}

export default Playfield;
