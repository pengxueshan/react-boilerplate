import React, {Component} from 'react';
import {MODULE_INFO} from '../../../utils/constants';
import {Route} from 'react-router-dom';

import './index.css';

export default class Routes extends Component {
    renderNavContent() {
        return Object.keys(MODULE_INFO).map(item => {
            let mod = MODULE_INFO[item];
            let modComponent = mod.component;
            return <Route key={mod.id} path={`/${mod.id}`} component={modComponent} />;
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
