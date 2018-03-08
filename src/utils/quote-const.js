// 交易所
const Exchange = {
    SSE: 101,  // 上海证券交易所
    SZSE: 105,  // 深圳证券交易所
    NEEQ: 111,  // 三板交易市场
    HKEX: 161,  // 香港联合交易所
    SHEMTC: 159,  // 上海股权托管交易中心
    QLETC: 160,  // 齐鲁证券交易中心
    SGX: 201,  // 新加坡股票交易所
    NASDAQ: 302,  // 美国纳斯达克证券交易所
    NYSE: 303,  // 纽约证券交易所
    SHGT: 901,  // 沪港通
    SZGT: 902,  // 深港通
    SECT: 903,  // 板块
}

export default {
    HQ_FUN_TYPE_MAP: {
        KX: 1,
        FS: 2,
        BK: 4,
        FB: 5,
        DM: 6,
        SS: 8,
        ZX: 9, // 自选股组合，不含盘口
        ST: 10, //测速，返回沪深两市市场状态,客户端可以每30秒查一次
        ZJ: 11 //资金流向
    },
    FLAG: {
        req: 0,
        res: 1,
        pub: 2

    },
    KLINE_PERIOD_TYPE: [
        'unknown',
        'min1',
        'min5',
        'min10',
        'min15',
        'min30',
        'min60',
        'daily',
        'weekly',
        'monthly',
        'quarterly',
        'semesterly',
        'yearly'
    ],
    TSScene: {
        ONE_DAY: 0,    // 当日分时
        FIVE_DAY: 1,    // 五日分时
    },
    KLineType: {
        KX_UNKNOWN: 0,
        KT_MIN1: 1, 	//01分钟数据
        KT_MIN5: 2,    //05分钟数据
        KT_MIN10: 3,    //10分钟数据
        KT_MIN15: 4,    //15分钟数据
        KT_MIN30: 5,    //30分钟数据
        KT_MIN60: 6,    //60分钟数据
        KT_DAY: 7,    //日K线数据
        KT_WEEK: 8,    //周K线数据
        KT_MONTH: 9,    //月K线数据
        KT_MNT3: 10,   //季K线数据
        KT_MNT6: 11,   //半年K线数据
        KT_MNT12: 12,   //年K线数据
    },
    BOARD_TYPE: [
        'BK_UNKNOWN',
        'BK_A',
        'BK_B',
        'BK_SZ_A',
        'BK_SH_A',
        'BK_SZ_B',
        'BK_SH_B',
        'BK_FUND',
        'BK_WARRANT',
        'BK_INDEX',
        'BK_BOND',
        'BK_GROWTH',
        'BK_SMALL',
        'BK_THIRD',
        'BK_GGT',
        'BK_SECTOR', //行业板块
        'BK_REGION', //地区板块
        'BK_CONCEPT', //概念板块
        'BK_SZGT'
    ],
    SORT_TYPE: [
        'PX_NONE',
        'PX_CHANGE_PCT',
        'PX_NOW',
        'PX_PCLOSE',
        'PX_VOLUME',
        'PX_AMOUNT',
        'PX_OPEN',
        'PX_HIGH',
        'PX_LOW',
        'PX_CODE',
        'PX_TURNOVER',
        'PX_PE',
        'PX_CHANGE'
    ],

    transMarket: function(market) {
        var exchange = Exchange.SSE;
        switch (market) {
            case 'sz':
                exchange = Exchange.SZSE;
                break;
            case 'ggt':
                exchange = Exchange.SHGT;
                break;
            case 'szgt':
                exchange = Exchange.SZGT;
                break;
            case 'sect':
                exchange = Exchange.SECT;
                break;
            case 'hkex':
                exchange = Exchange.HKEX;
                break;
        }
        return exchange;
    },

    transExchange: function(exchange) {
        var market = 'sh';
        switch (exchange) {
            case Exchange.SZSE:
                market = 'sz';
                break;
            case Exchange.SHGT:
                market = 'ggt';
                break;
            case Exchange.SZGT:
                market = 'szgt';
                break;
            case Exchange.SECT:
                market = 'sect';
                break;
        }
        return market;
    }
}
