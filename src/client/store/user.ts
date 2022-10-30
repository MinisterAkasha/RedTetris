import { makeAutoObservable } from 'mobx';

export class UserStore {
    user: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: string) {
        this.user = user;
    }
}
