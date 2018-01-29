import React, {Component} from 'react';
import SkinManager from '../skin-manager';
import UserInfo from '../user-info';
import Nav from '../router/nav';

import './index.css';

export default class TopBar extends Component {
    render() {
        return (
            <div className="top-bar">
                <UserInfo />
                <Nav />
                <SkinManager />
            </div>
        );
    }
}
