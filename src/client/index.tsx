import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { StoreProvider } from './Components/StoreProvider/StoreProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
    // <React.StrictMode>
    <StoreProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StoreProvider>,
    // </React.StrictMode>,
);
