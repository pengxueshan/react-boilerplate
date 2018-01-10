import React, {Component} from 'react';
import {PLUGINS_INFO} from '../../utils/constants';
import {Route, Link, HashRouter} from 'react-router-dom';
import PluginStore from '../../utils/plugin-store';

export default class Nav extends Component {
    renderNav() {
        return Object.keys(PLUGINS_INFO).map(item => {
            let plugin = PLUGINS_INFO[item];
            return <Link key={plugin.id} to={`/${plugin.id}`}>{plugin.name}</Link>;
        });
    }

    renderNavContent() {
        return Object.keys(PLUGINS_INFO).map(item => {
            let plugin = PLUGINS_INFO[item];
            let PluginComponent = PluginStore.getImpl(plugin.id, 'main');
            return <Route key={plugin.id} path={`/${plugin.id}`} component={PluginComponent} />;
        });
    }

    render() {
        return (
            <HashRouter>
                <div className="core-router">
                    <div className="core-router-nav">
                        {this.renderNav()}
                    </div>
                    <div className="core-router-content">
                        {this.renderNavContent()}
                    </div>
                </div>
            </HashRouter>
        );
    }
}
