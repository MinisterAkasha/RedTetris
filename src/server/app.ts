import express from 'express';
import { Server } from 'socket.io';

import { Game } from './Game/Game';

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.static('build'));

let users: any[] = [];

const server = app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:9000',
    },
});

const game = new Game();

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    // socket.emit('game', game);

    socket.on('game', () => {
        socket.emit('game', game);
    });

    if (!users.includes(socket.id)) {
        users.push(socket.id);
    }
    socket.join('clock-room');

    io.to('clock-room').emit('users', users);

    // socket.on('join', () => {
    //     if (!users.includes(socket.id)) {
    //         users.push(socket.id);
    //     }
    //     socket.join('clock-room');
    //
    //     io.to('clock-room').emit('users', users);
    // });
    //
    // socket.on('leave', () => {
    //     users = users.filter((el) => el !== socket.id);
    //
    //     io.to('clock-room').emit('users', users);
    //
    //     socket.leave('clock-room');
    //     // socket.emit('time', null);
    // });

    socket.on('disconnect', (reason) => {
        users = users.filter((el) => el !== socket.id);

        io.to('clock-room').emit('users', users);

        socket.leave('clock-room');
        console.log(reason);
    });
});
