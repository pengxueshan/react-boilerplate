import React, {Component} from 'react';
import SkinManager from '../skin-manager';

import './index.css';

export default class TopBar extends Component {
    render() {
        return (
            <div className="top-bar">
                top bar
                <SkinManager />
            </div>
        );
    }
}
