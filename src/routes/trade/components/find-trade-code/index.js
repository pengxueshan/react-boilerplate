import React, {Component} from 'react';
import {Input, Menu} from 'codish-ui';
import CodeList from 'trader/codelist';
import {trade} from '@gf/gf-quote-sdk';
import {TRADE_CODE_LENGTH} from '../../utils/constants';

export default class FindTradeCode extends Component {
    state = {
        list: [],
        stock: null
    };

    handleInputChange = v => {
        this.curInput = v;
        if (this.state.stock && this.state.stock.stockCode !== v) {
            this.setState({
                stock: null
            });
        }
        if (v.length === TRADE_CODE_LENGTH) {
            this.querySecurities(v);
        }
        CodeList.findForTrade(v, list => {
            let tmp = this.state.list[0];
            if (tmp && tmp.stockCode) return;
            if (this.curInput !== v) return;
            this.setState({
                list,
            });
        });
    }

    formatCodeList = data => {
        return data.map(item => {
            return {
                text: item.code,
                tail: item.name
            };
        });
    }

    formatSecurities = data => {
        return data.map(item => {
            return {
                text: item.stockCode,
                tail: item.stockName
            };
        });
    }

    getMenuList = () => {
        let tmp = this.state.list[0];
        if (tmp && tmp.stockCode) {
            return this.formatSecurities(this.state.list);
        }
        return this.formatCodeList(this.state.list);
    }

    isShowList = () => {
        return this.state.list && this.state.list.length > 0;
    }

    handleListItemClick = (data, index) => {
        let stock = this.state.list[index];
        if (stock) {
            if (stock.stockName && stock.stockCode) {
                return this.setState({
                    stock,
                });
            }
            if (stock.code) {
                this.querySecurities(stock.code);
            }
        }
    }

    querySecurities = stockCode => {
        if (!stockCode) return;
        trade.qrySecurity({stockCode}).then(rsp => {
            if (rsp.data) {
                if (rsp.data.length === 1) {
                    this.setState({
                        stock: rsp.data[0],
                        list: [],
                    });
                } else {
                    this.setState({
                        list: rsp.data
                    });
                }
            }
        });
    }

    handleListClose = () => {
        this.setState({
            list: []
        });
    }

    getMenuPosition = () => {
        if (!this.input) return;
        let info = this.input.getInputRef().getBoundingClientRect();
        return {
            x: info.x,
            y: info.y + info.height,
            width: info.width
        };
    }

    renderStockName = () => {
        return (
            <span>{this.state.stock && this.state.stock.stockName}</span>
        );
    }

    render() {
        let info = this.getMenuPosition();
        return (
            <div className="find-trade-code">
                <Input inline
                    defaultValue={this.state.stock && this.state.stock.stockCode}
                    onChange={this.handleInputChange}
                    ref={node => this.input = node}
                    renderExtra={this.renderStockName}
                    inner />
                {this.isShowList() ?
                    <Menu
                        data={this.getMenuList()}
                        onItemClick={this.handleListItemClick}
                        onClose={this.handleListClose}
                        width={info.width}
                        position={{x: info.x, y: info.y}} /> : null}
            </div>
        );
    }
}
