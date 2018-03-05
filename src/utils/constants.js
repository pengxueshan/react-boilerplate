let MODULE_INFO = {};

import(/* webpackChunkName: "trade" */'../components/trade').then(Trade => {
    MODULE_INFO['trade'] = {
        id: 'trade',
        name: '交易',
        component: Trade
    };
});

import(/* webpackChunkName: "quote" */'../components/quote').then(Quote => {
    MODULE_INFO['quote'] = {
        id: 'quote',
        name: '行情',
        component: Quote
    };
});

export {MODULE_INFO};

export const SKIN = [
    {
        name: 'dark',
        text: '黑色'
    },
    {
        name: 'light',
        text: '白色'
    }
];
