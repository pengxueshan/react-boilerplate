import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TopBar from '../top-bar';
import {observer, inject} from 'mobx-react';
import {loadPlugins} from '../../utils/plugin-store';
import Loader from '../loader';
import {connect} from '../../utils/connection';
import LoginPopup from '../login-popup';
import Status from '../status';
import {HashRouter} from 'react-router-dom';
import Routes from '../router';
import Quick from '../quick';

import './index.css';

@inject(stores => {
    let {
        skin,
        isLoginShow
    } = stores.app;
    return {
        skin,
        isLoginShow
    }
})
@observer
export default class App extends Component {
    static propTypes = {
        skin: PropTypes.string,
        isLoginShow: PropTypes.bool,
    };

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
            <HashRouter>
                <div className="app">
                    <TopBar />
                    <div className="app-content">
                        <Routes />
                        <Quick />
                    </div>
                    <Status />
                    {this.props.isLoginShow ? <LoginPopup /> : null}
                </div>
            </HashRouter>
        );
    }
}
