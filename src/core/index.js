import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/main/index';
import store from '../store';
import {Provider} from 'mobx-react';

ReactDOM.render(
    <Provider {...store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
