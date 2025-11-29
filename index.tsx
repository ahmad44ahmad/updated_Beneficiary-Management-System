/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './src/components/App';

import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './src/context/AppContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AppProvider>
                <App />
            </AppProvider>
        </BrowserRouter>
    </React.StrictMode>
);
