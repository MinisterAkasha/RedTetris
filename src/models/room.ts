export type ModeType = 'solo' | 'multiplayer';

export interface RoomType {
    mode: ModeType;
    host: string;
    limit: number;
    usersCount: number;
    users: string[];
}
