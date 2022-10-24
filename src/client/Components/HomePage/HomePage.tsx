import React from 'react';
import { observer } from 'mobx-react-lite';

import { RoomsTable } from '../RoomsTable/RoomsTable';
import { useStores } from '../../store/store';
import { GameSettings } from '../GameSettings/GameSettings';

// const roomsMock = [
//     { mode: 'solo', host: 'akasha', users: 1, limit: 5 },
//     { mode: 'multiplayer', host: 'asdf', users: 5, limit: 5 },
// ];

export const HomePage = observer(() => {
    const { roomStore } = useStores();

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
