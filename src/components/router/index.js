import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import User from '../user';

export default class Router extends Component {
    render() {
        return (
            <div className="">
                <Switch>
                    <Route path="/" component={User} />
                </Switch>
            </div>
        );
    }
}
