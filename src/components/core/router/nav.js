import React, {Component} from 'react';
import {MODULE_INFO} from '../../../utils/constants';
import {NavLink} from 'react-router-dom';

export default class Nav extends Component {
    renderNav() {
        return Object.keys(MODULE_INFO).map(item => {
            let mod = MODULE_INFO[item];
            return <NavLink key={mod.id} to={`/${mod.id}`} activeClassName="active">{mod.name}</NavLink>;
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
