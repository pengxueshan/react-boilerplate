import React, {Component} from 'react';
import {Provider} from 'mobx-react';
import store from './store';
import Search from './search';

export default class SearchContainer extends Component {
    render() {
        return (
            <Provider {...store}>
                <Search />
            </Provider>
        );
    }
}
