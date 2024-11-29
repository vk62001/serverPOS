import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

declare global {
    interface Window {
        __INITIAL_STATE__?: any;
    }
}

// Hidratar el estado inicial en el cliente
const preloadedState = window.__INITIAL_STATE__;
if (preloadedState) {
    store.dispatch({ type: 'REPLACE_STATE', payload: preloadedState });
}

import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.hydrateRoot(
        rootElement,
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
}