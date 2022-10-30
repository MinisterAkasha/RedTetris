import { useContext } from 'react';

import { StoreContext } from '../Components/StoreProvider/StoreProvider';

import { SocketStore } from './socket';
import { RoomsStore } from './rooms';
import { UserStore } from './user';

export const useStores = (): RootStore => useContext(StoreContext);

export class RootStore {
    socketStore: SocketStore;
    roomStore: RoomsStore;
    userStore: UserStore;

    constructor() {
        this.socketStore = new SocketStore();
        this.roomStore = new RoomsStore();
        this.userStore = new UserStore();
    }
}

export default new RootStore();
