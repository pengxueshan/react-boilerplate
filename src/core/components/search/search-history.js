import React, {Component} from 'react';
import {getItem} from '../../../utils/config-store';
import {SEARCH_HISTORY_KEY} from './constants';
import Item from './item';

export default class SearchHistory extends Component {
    getHistoryData = () => {
        let data = getItem(SEARCH_HISTORY_KEY);
        if (!data) return [];
        return [].concat(data).slice(0, 3);
    }

    renderHistory = data => {
        if (!data) return;
        return data.map(item => {
            return (
                <Item key={`${item.code}-${item.market}`} data={item} />
            );
        });
    }

    render() {
        let data = this.getHistoryData();
        if (data.length < 1) {
            return null;
        }
        return (
            <div className="search-history">
                <h3>搜索历史</h3>
                {this.renderHistory(data)}
            </div>
        );
    }
}
