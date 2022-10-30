import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStores } from '../../store/store';

export const AuthPage = observer(() => {
    const { userStore } = useStores();
    const location = useLocation();

    useEffect(() => {
        if (userStore.user) {
            return;
        }

        const name = prompt('Enter your name');
        userStore.setUser(name as string);
    }, [userStore]);

    if (userStore.user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <div />;
});
