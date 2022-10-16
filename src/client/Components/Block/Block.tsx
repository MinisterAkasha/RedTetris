import React from 'react';
import styled, { css } from 'styled-components';

import { PieceType } from '../../../models/piese';

const TypeToColor: Record<PieceType, string> = {
    I: 'red',
    J: 'white',
    L: 'purple',
    O: 'blue',
    S: 'green',
    T: 'yellow',
    Z: 'cyan',
};

interface BlockProps {
    type: PieceType;
    size: number;
    position: {
        x: number;
        y: number;
    };
}

const StyledBlock = styled.span<Omit<BlockProps, 'type'> & { color: string }>`
    box-sizing: border-box;
    border-style: outset;
    grid-column: 1;

    ${({ size, color, position: { x, y } }) => css`
        background: ${color};
        border-color: ${color};
        width: ${size}px;
        height: ${size}px;

        border-radius: ${size * 0.1}px;
        border-width: ${size * 0.2}px;

        grid-column: ${x + 1};
        grid-row: ${y + 1};
    `}
`;

export function Block({ type, size, position }: BlockProps) {
    return <StyledBlock color={TypeToColor[type]} size={size} position={position} />;
}
