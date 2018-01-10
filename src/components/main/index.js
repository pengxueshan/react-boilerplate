import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TopBar from '../top-bar';
import {observer, inject} from 'mobx-react';
import {loadPlugins} from '../../utils/plugin-store';
import Loader from '../loader';
import {connect} from '../../utils/connection';
import AppRouter from '../router';

import './index.css';

@inject(stores => {
    let {
        skin
    } = stores.app;
    return {
        skin
    }
})
@observer
export default class App extends Component {
    state = {
        isloaded: false
    }

    componentDidMount() {
        loadPlugins().then(connect).then(() => {
            this.setSkin();
            this.setState({
                isloaded: true
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.skin !== this.props.skin) {
            this.setSkin(nextProps);
        }
    }

    setSkin = (props) => {
        props = props || this.props;
        let body = document.querySelector('body');
        body.className = props.skin;
    }

    render() {
        if (!this.state.isloaded) {
            return <Loader />;
        }
        return (
            <div className="app">
                <TopBar />
                <AppRouter />
            </div>
        );
    }
}

App.propTypes = {
    skin: PropTypes.string
};
