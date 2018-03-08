import {transMarket, transExchange} from './quote-const';
import QuoteManager from './quote-manager';

module.exports = {
    data(d) {
        this._sha = d.sha;
        this._data = d.data || [];
        this._cache = {} // key: market-code
        this.initCache()
    },

    initCache() {
        this._data.forEach(item => {
            this._cache[`${item.market}-${item.code}`] = item
        })
    },

    AddMarket(stocklist) {
        if (stocklist == undefined)
            return;
        if (stocklist instanceof Array) {
            for (var i = 0;i < stocklist.length;i++) {
                var market = transExchange(stocklist[i].exchange);
                stocklist[i]['market'] = market;
            }
        }
        else if (typeof stocklist == 'object' && stocklist.exchange) {
            stocklist['market'] = transExchange(stocklist.exchange);
        }
    },

    find: function (q, cbk) {
        if (q == '' || q == null || q == undefined) {
            cbk([]);
            return;
        }
        var options = {};
        if (q != null && typeof q == 'object')
            options = {'type': options.type, 'keyword': options.keyword, 'from': options.from, 'exchange': options.exchange, 'secuType': options.secuType, 'count': options.count};
        else
            options = {'keyword': q};
        QuoteManager.codeSearch(options, cbk);
    },

    findForTrade: function (q, cbk) {
        if (q == '' || q == null || q == undefined) {
            cbk([]);
            return;
        }
        var options = {};
        if (q != null && typeof q == 'object')
            options = {'type': options.type, 'keyword': options.keyword, 'from': options.from, 'exchange': options.exchange, 'secuType': options.secuType, 'count': options.count};
        else
            options = {'keyword': q};
        QuoteManager.codeSearch(options, cbk, true);
    },

    getFromSearch: function (market, code, cbk) {
        if (!market || !code) {
            cbk(null);
            return;
        }
        let exchange = transMarket(market);
        let exchanges = []; exchanges.push(exchange);
        var options = {'keyword': code, 'exchange': exchanges};
        QuoteManager.codeSearch(options, cbk, false, true);
    },

    get: function (market, code) {
        let exchange = transMarket(market);
        var options = {'exchange': exchange, 'code': code};
        var stockinfo = QuoteManager.codelistGet(options);
        this.AddMarket(stockinfo);

        return stockinfo;
    },
};
