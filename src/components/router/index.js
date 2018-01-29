import React, {Component} from 'react';
import {PLUGINS_INFO} from '../../utils/constants';
import {Route} from 'react-router-dom';
import PluginStore from '../../utils/plugin-store';

import './index.css';

export default class Routes extends Component {
    renderNavContent() {
        return Object.keys(PLUGINS_INFO).map(item => {
            let plugin = PLUGINS_INFO[item];
            let PluginComponent = PluginStore.getImpl(plugin.id, 'main');
            return <Route key={plugin.id} path={`/${plugin.id}`} component={PluginComponent} />;
        });
    }

    render() {
        return (
            <div className="core-router-content">
                {this.renderNavContent()}
            </div>
        );
    }
}
