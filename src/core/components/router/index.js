import React, {Component} from 'react';
import {routeInfo} from '../../../utils/module-info';
import {Route, Switch} from 'react-router-dom';

import './index.css';

export default class Routes extends Component {
    renderNavContent() {
        return routeInfo.map(mod => {
            return (
                <Route key={mod.id} path={mod.path} component={mod.component} />
            );
        });
    }

    render() {
        return (
            <div className="core-router-content">
                <Switch>
                    {this.renderNavContent()}
                </Switch>
            </div>
        );
    }
}
