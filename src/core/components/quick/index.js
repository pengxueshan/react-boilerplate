import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import classNames from 'classnames';

import './index.css';

@inject(stores => {
    let {
        isQuickFixed,
        setQuickFixed
    } = stores.app;
    return {
        isQuickFixed,
        setQuickFixed
    };
})
@observer
export default class Quick extends Component {
    static propTypes = {
        isQuickFixed: PropTypes.bool,
        setQuickFixed: PropTypes.func
    };

    state = {
    }

    handleFixedClick = () => {
        this.props.setQuickFixed(!this.props.isQuickFixed);
    }

    render() {
        let cls = classNames('app-quick', {
            'is-fixed': this.props.isQuickFixed
        });
        return (
            <div className={cls}>
                <div onClick={this.handleFixedClick}
                    className="app-quick-fixed">{this.props.isQuickFixed ? '解除固定' : '固定'}</div>
                <div className="app-quick-item-wrap">
                    <div className="app-quick-item"><span>普</span>普通交易</div>
                    <div className="app-quick-item"><span>信</span>信用交易</div>
                    <div className="app-quick-item"><span>开</span>开放基金</div>
                    <div className="app-quick-item"><span>A</span>沪深行情</div>
                    <div className="app-quick-item"><span>转</span>银证转账</div>
                </div>
            </div>
        );
    }
}
