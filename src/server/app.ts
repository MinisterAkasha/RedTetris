import express from 'express';
import { Server } from 'socket.io';

import { RoomType } from '../models/room';
import { SocketEvents } from '../models/events';

import { Room } from './Room/Room';
import { User } from './User/User';

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.static('build'));

const server = app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});

export const io = new Server(server, {
    cors: {
        origin: 'http://localhost:9000',
    },
});

const rooms: Room[] = [];
let users: User[] = [];

const sendRoomsData = (rooms: Room[]) => {
    io.emit(
        SocketEvents.GET_ROOMS,
        rooms.map((el) => el.getState()),
    );
};

const onConnect = (rooms: Room[]) => {
    sendRoomsData(rooms);
};

io.on('connection', (socket) => {
    const user = new User(socket, socket.id);

    users.push(user);

    onConnect(rooms);

    socket.on(SocketEvents.SET_USER_NAME, (name: string) => {
        user.name = name;
    });

    socket.on(SocketEvents.GET_ROOMS, () => {
        sendRoomsData(rooms);
    });

    socket.on(SocketEvents.CREATE_ROOM, (data: RoomType) => {
        const room = new Room({ ...data, host: user });

        rooms.push(room);
        sendRoomsData(rooms);
    });

    socket.on(SocketEvents.JOIN_ROOM, (hostName: string) => {
        console.log(SocketEvents.JOIN_ROOM, hostName);

        const currentRoom = rooms.filter((room) => room.host.name === hostName)[0];

        if (currentRoom) {
            currentRoom.connect(user);
            socket.join(currentRoom.host.name);
        } else {
            // TODO дописать, если комната не найдена
        }

        sendRoomsData(rooms);
    });

    socket.on(SocketEvents.LEAVE_ROOM, (hostName) => {
        const currentRoom = rooms.filter((room) => room.host === hostName)[0];

        // console.log('currentRoom', currentRoom);

        if (currentRoom) {
            currentRoom.disconnect(user);
            socket.leave(currentRoom.host.name);
        } else {
            // TODO дописать, если комната не найдена
        }

        sendRoomsData(rooms);
    });

    // setInterval(() => {
    //     game.movePieceDown();
    //     socket.emit('game-state', game.getState());
    //     // io.to('game-room').emit('game-state', game.getState());
    // }, 1000);

    // socket.emit('game', game);

    // socket.on('game', () => {
    //     socket.emit('game', game);
    // });

    // io.to('game-room').emit('users', users);

    // socket.on('join', () => {
    //     if (!users.includes(socket.id)) {
    //         users.push(socket.id);
    //     }
    //     socket.join('game-room');
    //
    //     io.to('game-room').emit('users', users);
    // });
    //
    // socket.on('leave', () => {
    //     users = users.filter((el) => el !== socket.id);
    //
    //     io.to('game-room').emit('users', users);
    //
    //     socket.leave('game-room');
    //     // socket.emit('time', null);
    // });

    socket.on('disconnect', (reason) => {
        // io.to('game-room').emit('users', users);

        // socket.leave('game-room');
        users = users.filter((user) => user.id !== socket.id);
        // console.log('a user disconnected', socket.id, users);
        console.log(reason);
    });
});
