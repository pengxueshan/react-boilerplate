import React, {Component} from 'react';
import {trade} from '@gf/gf-quote-sdk';

import './index.css';

export default class Status extends Component {
    render() {
        return (
            <div className="app-status">
                {trade.manager.getState().siteInfo[0].host}
                {trade.manager.getState().siteInfo[0].name}
            </div>
        );
    }
}
