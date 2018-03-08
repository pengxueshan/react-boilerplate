import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Popup} from 'codish-ui';
import {inject, observer} from 'mobx-react';
import SettingPop from './pop';
import Search from '../search';

import './index.css';

@inject(stores => {
    let {
        isSettingShow,
        showSetting,
        hideSetting
    } = stores.app;
    return {
        isSettingShow,
        showSetting,
        hideSetting
    };
})
@observer
export default class Setting extends Component {
    static propTypes = {
        isSettingShow: PropTypes.bool,
        showSetting: PropTypes.func,
        hideSetting: PropTypes.func,
    };

    render() {
        return (
            <div className="app-setting">
                <Search />
                <span onClick={this.props.showSetting}>设置</span>
                {
                    this.props.isSettingShow ?
                        <Popup onClose={this.props.hideSetting}><SettingPop /></Popup> : null
                }
            </div>
        );
    }
}
