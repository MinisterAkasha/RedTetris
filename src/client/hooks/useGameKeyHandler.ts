import { useEffect } from 'react';

import { useStores } from '../store/store';
import { SocketEvents } from '../../models/events';

export const useGameKeyHandler = () => {
    const { socketStore } = useStores();

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            socketStore.socket.emit(SocketEvents.KEYDOWN, event.code);
        };
        const keyUpHandler = (event: KeyboardEvent) => {
            socketStore.socket.emit(SocketEvents.KEYUP, event.code);
        };

        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
        };
    }, [socketStore.socket]);
};
