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
    // TODO дописать добавление имени пользователю
    // @ts-ignore
    const user = new User(socket, 'akasha', socket.id);

    users.push(user);
    // console.log('a user connected', socket.id, users);

    onConnect(rooms);

    socket.on(SocketEvents.CREATE_ROOM, (data: RoomType) => {
        // console.log(SocketEvents.CREATE_ROOM, data);
        const room = new Room(data, socket);
        // room.addUser(user);

        rooms.push(room);
        sendRoomsData(rooms);
    });

    socket.on(SocketEvents.JOIN_ROOM, (hostName: string) => {
        console.log(SocketEvents.JOIN_ROOM, hostName);

        // const newUser = users.filter((user) => user.name === )
        const currentRoom = rooms.filter((room) => room.host === hostName)[0];

        console.log('currentRoom', currentRoom);

        if (currentRoom) {
            currentRoom.addUser(user);
            socket.join(currentRoom.host);
        } else {
            // TODO дописать, если комната не найдена
        }

        sendRoomsData(rooms);
    });

    socket.on(SocketEvents.LEAVE_ROOM, (hostName) => {
        const currentRoom = rooms.filter((room) => room.host === hostName)[0];

        // console.log('currentRoom', currentRoom);

        if (currentRoom) {
            currentRoom.removeUser(user);
            socket.leave(currentRoom.host);
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
