import { User } from '../server/User/User';

export type ModeType = 'solo' | 'multiplayer';

export interface RoomType {
    readonly mode: ModeType;
    host: string;
    limit: number;
    usersCount: number;
    users: User[];
}
