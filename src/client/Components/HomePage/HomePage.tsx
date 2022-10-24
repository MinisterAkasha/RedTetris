import React from 'react';

import { RoomsTable } from '../RoomsTable/RoomsTable';

export function HomePage() {
    return (
        <div>
            <RoomsTable
                rooms={[
                    { mode: 'solo', host: 'akasha', users: 1, limit: 5 },
                    { mode: 'multiplayer', host: 'asdf', users: 5, limit: 5 },
                ]}
            />
            <div>
                <div>Режим</div>
                <select>
                    <option value="solo">Solo</option>
                    <option value="multiplayer">Multiplayer</option>
                </select>
                <button type="button">Create room</button>
            </div>
        </div>
    );
}
