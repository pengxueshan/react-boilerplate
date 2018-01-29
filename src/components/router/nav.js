import React, {Component} from 'react';
import {PLUGINS_INFO} from '../../utils/constants';
import {NavLink} from 'react-router-dom';

export default class Nav extends Component {
    renderNav() {
        return Object.keys(PLUGINS_INFO).map(item => {
            let plugin = PLUGINS_INFO[item];
            return <NavLink key={plugin.id} to={`/${plugin.id}`} activeClassName="active">{plugin.name}</NavLink>;
        });
    }

    render() {
        return (
            <div className="core-router-nav">
                {this.renderNav()}
            </div>
        );
    }
}
