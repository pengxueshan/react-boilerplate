import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import User from '../user';
import Info from '../info';
import NoMatch from '../no-match';
import Login from '../login';

export default class Router extends Component {
    render() {
        return (
            <div className="">
                <Switch>
                    <Route path="/" component={Info} exact />
                    <Route path="/user" component={User} />
                    <Route path="/info" component={Info} />
                    <Route path="/login" component={Login} />
                    <Route component={NoMatch} />
                </Switch>
            </div>
        );
    }
}
