import React from 'react';
import styled, { css } from 'styled-components';

interface BlockProps {
    color: string;
    size: number;
    position: {
        x: number;
        y: number;
    };
}

const StyledBlock = styled.span<BlockProps>`
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

export function Block({ color, size, position }: BlockProps) {
    return <StyledBlock color={color} size={size} position={position} />;
}
