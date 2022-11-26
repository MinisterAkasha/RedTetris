import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStores } from '../../store/store';
import { SocketEvents } from '../../../models/events';

export const AuthPage = observer(() => {
    const {
        userStore,
        socketStore: { socket },
    } = useStores();
    const location = useLocation();

    useEffect(() => {
        if (userStore.user) {
            return;
        }

        const name = prompt('Enter your name');
        socket.emit(SocketEvents.SET_USER_NAME, name);
        userStore.setUser(name as string);
    }, [socket, userStore]);

    if (userStore.user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <div />;
});
