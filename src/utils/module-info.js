import Loadable from 'react-loadable';
import Loader from '../core/loader';

let Quote = Loadable({
    loader: () => import(/* webpackChunkName: "quote" */'../routes/quote'),
    loading: Loader,
});

let Trade = Loadable({
    loader: () => import(/* webpackChunkName: "trade" */'../routes/trade'),
    loading: Loader,
});

let routeInfo = [
    {
        id: 'quote',
        name: '行情',
        path: '/quote',
        component: Quote
    },
    {
        id: 'trade',
        name: '交易',
        path: '/trade',
        component: Trade
    }
];

export {
    routeInfo
};
