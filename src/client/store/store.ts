import { useContext } from 'react';

import { StoreContext } from '../Components/StoreProvider/StoreProvider';

import { SocketStore } from './socket';

export const useStores = (): RootStore => useContext(StoreContext);

export class RootStore {
    socketStore: SocketStore;

    constructor() {
        this.socketStore = new SocketStore();
    }
}

export default new RootStore();
