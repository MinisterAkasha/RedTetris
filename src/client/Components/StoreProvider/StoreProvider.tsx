import React, { createContext, ReactNode } from 'react';

import rootStore, { RootStore } from '../../store/store';

export const StoreContext = createContext<RootStore>(rootStore);

export type StoreComponent = {
    children: ReactNode;
};

export function StoreProvider({ children }: StoreComponent) {
    return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
}
