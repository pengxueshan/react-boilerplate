import {observable, action} from 'mobx';

class Store {
    @observable skin = 'dark';
    @action setSkin = (skin) => {
        this.skin = skin;
    }
}

export default new Store();
