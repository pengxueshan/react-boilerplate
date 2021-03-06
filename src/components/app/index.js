import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {HashRouter} from 'react-router-dom';
import Router from '../router';

import './app.css';

@inject(stores => {
    let {
        skin,
    } = stores.app;
    return {
        skin,
    }
})
@observer
export default class App extends Component {
    static propTypes = {
        skin: PropTypes.string
    };
    render() {
        return (
            <HashRouter>
                <div className="app">
                    test props skin : {this.props.skin}
                    <Router />
                </div>
            </HashRouter>
        );
    }
}
