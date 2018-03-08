import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SEARCH_HISTORY_KEY} from './constants';
import {getItem, setItem} from '../../../utils/config-store';
import {inject, observer} from 'mobx-react';
import _ from 'lodash';

@inject(stores => {
    let {
        setSearchList,
        setHistoryList
    } = stores.searchStore;
    return {
        setSearchList,
        setHistoryList
    };
})
@observer
export default class Item extends Component {
    static propTypes = {
        data: PropTypes.object,
        onClick: PropTypes.func,
        setSearchList: PropTypes.func,
        setHistoryList: PropTypes.func
    };

    handleItemClick = () => {
        let data = getItem(SEARCH_HISTORY_KEY) || [];
        let storeData = [].concat(this.props.data, data);
        storeData = this.getDataToStore(storeData);
        setItem(SEARCH_HISTORY_KEY, storeData);
        this.props.setSearchList([]);
        this.props.setHistoryList([]);
    }

    getDataToStore = data => {
        if (!data) return;
        return _.unionWith(data, (a, b) => {
            return a.code === b.code && a.market === b.market;
        });
    }

    render() {
        let {data} = this.props;
        return (
            <div className="search-item" onClick={this.handleItemClick}>
                <span className="code">{data.code}</span>
                <span className="code">{data.name}</span>
            </div>
        );
    }
}
