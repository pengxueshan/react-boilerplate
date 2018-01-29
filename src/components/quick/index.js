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
                <div onClick={this.handleFixedClick}>{this.props.isQuickFixed ? '解除固定' : '固定'}</div>
            </div>
        );
    }
}
