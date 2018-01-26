import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {inject, observer} from 'mobx-react';

@inject(stores => {
    let {
        isTradeLogin
    } = stores.user;
    return {
        isTradeLogin
    };
})
@observer
export default class Trade extends Component {
    render() {
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
