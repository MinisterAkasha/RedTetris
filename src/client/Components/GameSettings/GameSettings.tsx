import React, { useCallback, useEffect, useState } from 'react';

import { ModeType, RoomType } from '../../../models/room';
import { SocketEvents } from '../../../models/events';
import { useStores } from '../../store/store';

const modeTypes: ModeType[] = ['solo', 'multiplayer'];

export function GameSettings() {
    const {
        socketStore: { socket },
        userStore: { user },
    } = useStores();

    const [limit, setLimit] = useState(1);
    const [mode, setMode] = useState<ModeType>('solo');

    const createRoom = useCallback(
        (roomSetting: Omit<RoomType, 'users' | 'usersCount'>) => () => {
            socket.emit(SocketEvents.CREATE_ROOM, { ...roomSetting });
        },
        [socket],
    );

    useEffect(() => {
        if (mode === 'solo') {
            setLimit(1);
        }
    }, [mode]);

    return (
        <div>
            <div>Режим</div>
            <select value={mode} onChange={(e) => setMode(e.target.value as ModeType)}>
                {modeTypes.map((modeType) => (
                    <option value={modeType} key={modeType}>
                        {modeType}
                    </option>
                ))}
            </select>

            {mode !== 'solo' && (
                <>
                    <label htmlFor="limit">{limit}</label>
                    <input
                        id="limit"
                        type="range"
                        max={10}
                        min={1}
                        value={limit}
                        onChange={(e) => setLimit(+e.target.value)}
                    />
                </>
            )}

            <button type="button" onClick={createRoom({ host: user as string, mode, limit })}>
                Create room
            </button>
        </div>
    );
}
