import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import {Provider} from 'react-redux';
import store from "./store"
import registerServiceWorker from './mess/registerServiceWorker';
import {BrowserRouter} from "react-router-dom";
import {Router} from "react-router-dom"
import createHistory from 'history/createBrowserHistory';
import {CookiesProvider} from "react-cookie"

const browserHistory = createHistory();

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <BrowserRouter>
                <Router history={browserHistory}>
                    <App/>
                </Router>
            </BrowserRouter>
        </Provider>
    </CookiesProvider>
    , document.getElementById('root'));
registerServiceWorker();
