import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Item from './item';
import {inject, observer} from 'mobx-react';

@inject(stores => {
    let {
        searchList
    } = stores.searchStore;
    return {searchList};
})
@observer
export default class Result extends Component {
    static propTypes = {
        searchList: PropTypes.any
    };

    renderResult = () => {
        return this.props.searchList.map(item => {
            return (
                <Item key={`${item.code}-${item.market}`} data={item} />
            );
        });
    }

    render() {
        return (
            <div className="search-result">
                {this.renderResult()}
            </div>
        );
    }
}
