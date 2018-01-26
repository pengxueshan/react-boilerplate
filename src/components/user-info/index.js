import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {trade} from '@gf/gf-quote-sdk';

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
    handleLoginClick = () => {
        this.props.showLogin();
    }

    getUserName() {
        let related = trade.session.getSessionRelated();
        if (related && related['0']) {
            let accounts = related['0'].stkAccountData;
            let account =  accounts.find(item => {
                return item.mainFlag == '1';
            });
            return account && account.holderName;
        }
        return '';
    }

    render() {
        if (!this.props.isTradeLogin) {
            return (
                <div className="user-info">
                    <span onClick={this.handleLoginClick}>登录</span>
                </div>
            );
        }
        return (
            <div className="user-info">
                {this.getUserName()}
            </div>
        );
    }
}

UserInfo.propTypes = {
    isTradeLogin: PropTypes.bool,
    showLogin: PropTypes.func,
};
