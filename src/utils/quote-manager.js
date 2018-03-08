//import sdk from '@gf/gf-quote-sdk';
import {Connect, Config, TS, Tick, KLine, CodeList, CodeSearch, QuantityPrice} from '@gf/gf-quote-sdk';
import {transExchange} from './quote-const';

var sdkid = 1;
var quoteSdk = {};
var connectEvent = false;

export default class QuoteManager {
    static initQuote(quoteSites, intVersion, deviceType) {
        //初始化环境
        Config.set({
            'softwareVer': intVersion,
            'deviceType': deviceType,
            'gzipCodeList': false
        });
        //连接站点
        Connect.init({type: 'web', site: quoteSites});
    }

    static initCodeList() {
        return CodeList.init([101, 105, 901, 902, 903]);
    }

    //CodeList股票信息
    static codelistGet(options) {
        return CodeList.get({
            exchange: options.exchange,
            code: options.code
        });
    }

    static codelistFind(options) {
        return CodeList.find(options.q, options.needtype, options.filtertype);
    }

    static codelistFindForTrade(options) {
        return CodeList.findForTrade(options.q);
    }

    //CodeSearch
    static codeSearch(options, cbk, bTrade = false, bSingle = false) {
        var list = [];
        var cs = new CodeSearch();
        cs.on('data', (data) => {
            cs.destroy();

            list = data || [];
            list = dealCodelist(list);
            if (bTrade) {
                var items = [];
                for (let i = 0;i < list.length; i++) {
                    if (list[i].type1 != 9 && list[i].type1 != 13 && list[i].type2 != 1003)
                        items.push(list[i]);
                }
                cbk(items);
            }
            else if (bSingle) {
                if (list && list.length > 0)
                    cbk(list[0]);
                else
                    cbk(null);
            }
            else
                cbk(list);
        });

        cs.set({
            type: options.type,
            keyword: options.keyword,
            from: options.from,
            exchange: options.exchange,
            secuType: options.secuType,
            count: options.count
        });
    }

    //行情站点信息
    static siteInfoSyn() {
        return Connect.getState();
    }

    static siteInfo(cbk) {
        if (connectEvent) {
            Connect.removeAllListeners('update');
            connectEvent = false;
        }
        Connect.on('update', (data) => {
            cbk(data);
        });
        //}
        cbk(Connect.getState());
    }

    static siteReconnect() {
        Connect.reconnect();
    }

    static connectToSite(i) {
        Connect.connectToSite(i);
    }

    static reSub() {
        Connect.reSub();
    }

    //行情数据信息
    static getSdk() {
        sdkid++;
        return sdkid;
    }

    static tickManager(options, cbk) {
        var tick = new Tick({'subscribe': options.subscribe});
        tick.on('data', (data) => {
            cbk(data);
        });
        quoteSdk[options.id] = tick;

        tick.set({
            exchange: options.exchange,
            code: options.code,
            from: options.from,
            count: options.count
        });
    }

    static tsManager(options, cbk) {
        var ts = new TS({'subscribe': true});
        ts.on('data', (data) => {
            cbk(data);
        });
        quoteSdk[options.id] = ts;

        ts.set({
            exchange: options.exchange,
            code: options.code,
            scene: options.scene
        });
    }

    static klineManager(options, cbk) {
        var kline = new KLine({'subscribe': options.subscribe});
        kline.on('data', (data) => {
            cbk(data);
        });
        quoteSdk[options.id] = kline;

        kline.set({
            exchange: options.exchange,
            code: options.code,
            type: options.type,
            direction: options.direction,
            from: options.from,
            count: options.count
        });
    }

    static qpriceManager(options, cbk) {
        var qprice = new QuantityPrice();
        qprice.on('data', (data) => {
            cbk(data);
        });
        quoteSdk[options.id] = qprice;

        qprice.set({
            exchange: options.exchange,
            code: options.code,
            from: options.from,
            subscribe: options.subscribe,
            refreshtime: 20000
        });
    }

    static destroySdk(sdkid) {
        if (quoteSdk[sdkid]) {
            quoteSdk[sdkid].destroy();
            quoteSdk[sdkid] = null;
        }
    }
}

function dealCodelist(data) {
    var items = [];
    for (let i = 0; data.results && i < data.results.length; i++) {
        let item = data.results[i];
        let new_item = {
            'exchange': item.id && item.id.exchange,
            'market': item.id && transExchange(item.id.exchange),
            'code': item.id && item.id.code,
            'name': item.info && item.info.name,
            'type1': item.info && item.info.type1,
            'type2': item.info && item.info.type2,
            'credit': item.info && item.info.stock && item.info.stock.credit
        };
        if (item.info && item.info.stock && item.info.stock.industrySectorId && item.info.stock.industrySectorInfo) {
            new_item.industry_exchange = item.info.stock.industrySectorId.exchange;
            new_item.industry_market = transExchange(new_item.industry_exchange);
            new_item.industry_code = item.info.stock.industrySectorId.code;
            new_item.industry_name = item.info.stock.industrySectorInfo.name;
        }
        items.push(new_item);
    }

    return items;
}
