import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { RoomType } from '../../../models/room';

interface RoomsTableProps {
    rooms: RoomType[];
}

const Table = styled.div<{ rows: number }>`
    display: grid;
    grid-template-columns: repeat(5, auto);
    grid-template-rows: repeat(${({ rows }) => rows}, auto);
`;

const Sell = styled.div<{ position: number; size: number }>`
    border: 1px solid white;

    ${({ position, size }) => css`
        grid-column: ${position} / ${position + size};
    `}
`;

export function RoomsTable({ rooms }: RoomsTableProps) {
    return (
        <Table rows={rooms.length + 1}>
            <Sell position={1} size={2}>
                Hostname
            </Sell>
            <Sell position={3} size={1}>
                Mode
            </Sell>
            <Sell position={4} size={1}>
                Users
            </Sell>
            <Sell position={5} size={1} />
            {rooms.map(({ mode, limit, host, usersCount }) => {
                return (
                    <React.Fragment key={host}>
                        <Sell position={1} size={2}>
                            {host}
                        </Sell>
                        <Sell position={3} size={1}>
                            {mode}
                        </Sell>
                        <Sell position={4} size={1}>
                            {usersCount}/{limit}
                        </Sell>
                        <Sell position={5} size={1}>
                            <Link to={`/${mode}[${host}]`}>Join</Link>
                        </Sell>
                    </React.Fragment>
                );
            })}
        </Table>
    );
}
