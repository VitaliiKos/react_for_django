import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {unstable_HistoryRouter as BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

import './index.css';
import App from './App';
import {setupStore} from "./redux";
import {history} from "./services";

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = setupStore();

root.render(
    <Provider store={store}>
        <BrowserRouter history={history}>
            <App/>
        </BrowserRouter>
    </Provider>
);

reportWebVitals();