import React, {Component} from 'react';
import {Tab, TabPane} from 'codish-ui';
import SkinManager from '../skin-manager';

export default class SettingPop extends Component {
    render() {
        return (
            <div className="setting-pop">
                <Tab>
                    <TabPane label="系统">
                        <div>系统设置</div>
                    </TabPane>
                    <TabPane label="皮肤">
                        <SkinManager />
                    </TabPane>
                </Tab>
            </div>
        );
    }
}
