import React, {Component} from 'react';
import UserInfo from '../user-info';
import Nav from '../router/nav';
import Setting from '../setting';

import './index.css';

export default class TopBar extends Component {
    render() {
        return (
            <div className="top-bar">
                <UserInfo />
                <Nav />
                <Setting />
            </div>
        );
    }
}
