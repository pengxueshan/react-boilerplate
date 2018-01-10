import {observable, action} from 'mobx';
import {trade} from '@gf/gf-quote-sdk';

class Store {
    @observable isTradeLogin = !!trade.session.getSessionCore()['0'];
    @observable isCreditLogin = !!trade.session.getSessionCore()['7'];
    @action setIsTradeLogin = isLogin => this.isTradeLogin = isLogin;
    @action setIsCreditLogin = isLogin => this.isCreditLogin = isLogin;
}

let store = new Store();

trade.session.on('change', () => {
    store.setIsTradeLogin(!!trade.session.getSessionCore()['0']);
    store.setIsCreditLogin(!!trade.session.getSessionCore()['7']);
});

trade.session.on('timeout', () => {
    store.setIsTradeLogin(false);
    store.setIsCreditLogin(false);
});

export default store;
