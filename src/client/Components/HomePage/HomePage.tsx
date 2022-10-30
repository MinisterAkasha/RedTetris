import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { RoomsTable } from '../RoomsTable/RoomsTable';
import { useStores } from '../../store/store';
import { GameSettings } from '../GameSettings/GameSettings';
import { SocketEvents } from '../../../models/events';
import { RoomType } from '../../../models/room';

// const roomsMock = [
//     { mode: 'solo', host: 'akasha', users: 1, limit: 5 },
//     { mode: 'multiplayer', host: 'asdf', users: 5, limit: 5 },
// ];

export const HomePage = observer(() => {
    const {
        roomStore,
        socketStore: { socket },
    } = useStores();

    useEffect(() => {
        socket.on(SocketEvents.GET_ROOMS, (data: RoomType[]) => {
            roomStore.setRooms(data);
        });
    }, [roomStore, socket]);

    // const setGameSetting = useCallback(
    //     (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    //         setSetting((prev) => ({ ...prev, [selector]: event.target.value }));
    //     },
    //     [setSetting],
    // );

    return (
        <div>
            <RoomsTable rooms={roomStore.rooms} />
            <GameSettings />
        </div>
    );
});
