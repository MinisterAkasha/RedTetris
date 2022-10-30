import React, { ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStores } from '../../store/store';

export const RequireAuth = observer(({ children }: { children: ReactNode | any }) => {
    const {
        userStore: { user },
    } = useStores();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return children;
});
