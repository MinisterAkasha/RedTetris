import { makeAutoObservable } from 'mobx';

import { RoomType } from '../../models/room';

export class RoomsStore {
    rooms: RoomType[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setRooms(rooms: RoomType[]) {
        this.rooms = rooms;
    }
}
