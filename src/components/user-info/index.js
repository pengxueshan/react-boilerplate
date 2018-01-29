import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {trade} from '@gf/gf-quote-sdk';
import {Layer} from 'codish-ui';
import UserInfoPopup from './info';

import './index.css';

@inject(stores => {
    let {
        isTradeLogin
    } = stores.user;
    let {
        showLogin
    } = stores.app;
    return {
        isTradeLogin,
        showLogin
    };
})
@observer
export default class UserInfo extends Component {
    static propTypes = {
        isTradeLogin: PropTypes.bool,
        showLogin: PropTypes.func,
    };

    state = {
        showUserLayer: false
    };

    handleLoginClick = () => {
        this.props.showLogin();
    }

    getUserName() {
        let related = trade.session.getSessionRelated();
        if (related && related['0']) {
            let accounts = related['0'].stkAccountData;
            let account = accounts.find(item => {
                return item.mainFlag == '1';
            });
            return account && account.holderName;
        }
        return '';
    }

    handleUserLayerClose = () => {
        this.setState({
            showUserLayer: false
        });
    }

    handleClick = () => {
        if (this.props.isTradeLogin) {
            this.setState({
                showUserLayer: true
            });
        }
        return false;
    }

    render() {
        if (!this.props.isTradeLogin) {
            return (
                <div className="user-info">
                    <span onClick={this.handleLoginClick} className="login-btn">登录</span>
                </div>
            );
        }
        return (
            <div className="user-info" onClick={this.handleClick}>
                {this.getUserName()}
                {
                    this.state.showUserLayer ?
                        <Layer show={this.state.showUserLayer}
                            onClose={this.handleUserLayerClose}
                            position={{x: 0, y: 30}}
                            className="user-info-popup"><UserInfoPopup /></Layer> : null
                }
            </div>
        );
    }
}
