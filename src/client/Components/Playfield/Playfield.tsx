import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

import { Block } from '../Block/Block';
import { PieceTypeEnum } from '../../../models/piese';

const TypeToColor: Record<PieceTypeEnum, string> = {
    I: 'red',
    J: 'white',
    L: 'purple',
    O: 'blue',
    S: 'green',
    T: 'yellow',
    Z: 'cyan',
};

interface PlayfieldSizeProps {
    width: number;
    blockSize: number;
}

const StyledPlayfield = styled.div<PlayfieldSizeProps>`
    background: black;
    display: grid;

    ${({ width, blockSize }) => css`
        width: ${width}px;
        grid-template-columns: repeat(10, ${blockSize}px);
        grid-template-rows: repeat(20, ${blockSize}px);
    `}
`;

interface PlayfieldProps {
    height: number;
    state: {
        items: (number | PieceTypeEnum)[][];
    };
}

function Playfield({ state, height }: PlayfieldProps) {
    const [width, blockSize] = useMemo(() => {
        const width = height / 2;
        const blockSize = width / 10;

        return [width, blockSize];
    }, [height]);

    return (
        <StyledPlayfield width={width} blockSize={blockSize}>
            {state.items.map((row, y) => {
                return row.map((col, x) => {
                    if (typeof col === 'number') {
                        return null;
                    }

                    return <Block color={TypeToColor[col]} size={blockSize} position={{ x, y }} />;
                });
            })}
        </StyledPlayfield>
    );
}

export default Playfield;
