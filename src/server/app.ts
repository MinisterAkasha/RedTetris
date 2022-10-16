import express from 'express';
import { Server } from 'socket.io';

import { Game } from './Game/Game';
import { Controller } from './Controller/Controller';

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.static('build'));

const server = app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:9000',
    },
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    const game = new Game();
    // @ts-ignore
    const controller = new Controller(socket, game);

    // setInterval(() => {
    //     game.movePieceDown();
    //     socket.emit('game-state', game.getState());
    //     // io.to('game-room').emit('game-state', game.getState());
    // }, 1000);

    // socket.emit('game', game);

    // socket.on('game', () => {
    //     socket.emit('game', game);
    // });

    socket.join('game-room');

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
        console.log(reason);
    });
});
