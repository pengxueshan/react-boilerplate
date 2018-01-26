import React, {Component} from 'react';
import SkinManager from '../skin-manager';
import UserInfo from '../user-info';

import './index.css';

export default class TopBar extends Component {
    render() {
        return (
            <div className="top-bar">
                <UserInfo />
                <SkinManager />
            </div>
        );
    }
}
