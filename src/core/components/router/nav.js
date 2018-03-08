import React, {Component} from 'react';
import {routeInfo} from '../../../utils/module-info';
import {NavLink} from 'react-router-dom';

export default class Nav extends Component {
    renderNav() {
        return routeInfo.map(mod => {
            return (
                <NavLink key={mod.id} to={mod.path} activeClassName="active">{mod.name}</NavLink>
            );
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
