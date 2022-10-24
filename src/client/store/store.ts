import { useContext } from 'react';

import { StoreContext } from '../Components/StoreProvider/StoreProvider';

import { SocketStore } from './socket';
import { RoomsStore } from './rooms';

export const useStores = (): RootStore => useContext(StoreContext);

export class RootStore {
    socketStore: SocketStore;
    roomStore: RoomsStore;

    constructor() {
        this.socketStore = new SocketStore();
        this.roomStore = new RoomsStore();
    }
}

export default new RootStore();
