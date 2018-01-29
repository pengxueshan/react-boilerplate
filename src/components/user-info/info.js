import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {trade} from '@gf/gf-quote-sdk';

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
export default class UserInfoPopup extends Component {
    static propTypes = {
        isTradeLogin: PropTypes.bool,
        showLogin: PropTypes.func,
    };

    state = {
    };

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

    getClientId() {
        let core = trade.session.getSessionCore();
        if (core && core['0']) {
            return core['0'].clientAccount;
        }
        return '';
    }

    render() {
        return (
            <div className="user-info-popup-inner">
                <div className="user-info-item">
                    <div className="title">姓名</div>
                    <div>{this.getUserName()}</div>
                </div>
                <div className="user-info-item">
                    <div className="title">客户号</div>
                    <div>{this.getClientId()}</div>
                </div>
            </div>
        );
    }
}
