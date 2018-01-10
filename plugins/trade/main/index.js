import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {inject, observer} from 'mobx-react';
import TradeLogin from '../trade-login';

@inject(stores => {
    let {
        isTradeLogin
    } = stores.login;
    return {
        isTradeLogin
    };
})
@observer
export default class Trade extends Component {
    render() {
        if (!this.props.isTradeLogin) {
            return <TradeLogin />;
        }
        return (
            <div>
                trade
            </div>
        );
    }
}

Trade.propTypes = {
    isTradeLogin: PropTypes.bool
}
