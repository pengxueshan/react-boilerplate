import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, Layer} from 'codish-ui';
import SearchHistory from './search-history';
import CodeList from '../../../utils/codelist';
import Result from './result';
import {inject, observer} from 'mobx-react';

import './index.css';

@inject(stores => {
    let {
        searchList,
        setSearchList,
        isShowLayer,
        setIsFocus,
        setHistoryList,
        clearList
    } = stores.searchStore;
    return {
        searchList,
        setSearchList,
        isShowLayer,
        setIsFocus,
        setHistoryList,
        clearList
    };
})
@observer
export default class Search extends Component {
    static propTypes = {
        searchList: PropTypes.any,
        isShowLayer: PropTypes.bool,
        setSearchList: PropTypes.func,
        setIsFocus: PropTypes.func,
        setHistoryList: PropTypes.func,
        clearList: PropTypes.func,
    };

    handleLayerClose = () => {
        this.props.clearList();
    }

    handleInputChange = v => {
        this.inputValue = v;
        CodeList.find(v, data => {
            if (v !== this.inputValue) return;
            this.props.setSearchList(data);
        });
    }

    getInputInfo = () => {
        if (!this.input) return;
        let info = this.input.getInputRef().getBoundingClientRect();
        return info;
    }

    handleInputFocus = () => {
        this.props.setIsFocus(true);
        this.props.setHistoryList();
    }

    handleInputBlur = () => {
        this.props.setIsFocus(false);
    }

    render() {
        let position = {
            x: 0, y: 0
        };
        let info = this.getInputInfo();
        let style = {};
        if (info) {
            position.x = info.x;
            position.y = info.y + info.height;

            style.width = `${info.width}px`;
        }
        return (
            <div className="code-search">
                <Input inline placeholder="代码/简拼/全拼"
                    onChange={this.handleInputChange}
                    ref={node => this.input = node}
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputBlur} />
                {this.props.isShowLayer ?
                    <Layer onClose={this.handleLayerClose} position={position}>
                        <div className="code-search-layer" style={style}>
                            <SearchHistory />
                            <Result />
                        </div>
                    </Layer> : null}
            </div>
        );
    }
}
