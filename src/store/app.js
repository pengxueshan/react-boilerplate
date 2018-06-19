import {observable, action} from 'mobx';

class Store {
    @observable skin = 'dark';
    @observable isLogined = false;
    @action setSkin = (skin) => {
        this.skin = skin;
    }
    @action setLogined = (logined) => {
        this.isLogined = logined;
    }
}

export default new Store();
