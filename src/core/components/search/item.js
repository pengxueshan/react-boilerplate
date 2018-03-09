import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SEARCH_HISTORY_KEY} from './constants';
import {getItem, setItem} from '../../../utils/config-store';
import {inject, observer} from 'mobx-react';
import _ from 'lodash';
import {withRouter} from 'react-router';

@inject(stores => {
    let {
        clearList,
    } = stores.searchStore;
    return {
        clearList,
    };
})
@observer
class Item extends Component {
    static propTypes = {
        data: PropTypes.object,
        onClick: PropTypes.func,
        clearList: PropTypes.func,
        history: PropTypes.object,
    };

    handleItemClick = () => {
        let data = getItem(SEARCH_HISTORY_KEY) || [];
        let storeData = [].concat(this.props.data, data);
        storeData = this.getDataToStore(storeData);
        setItem(SEARCH_HISTORY_KEY, storeData);
        this.props.clearList();
        this.props.history.push(`/quote/${this.props.data.market}/${this.props.data.code}`);
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

export default withRouter(Item);
