import {observable, action} from 'mobx';
import ConfigStore from '../utils/config-store';

class Store {
    @observable skin = ConfigStore.getItem('skin') || 'dark';
    @observable isLoginShow = false;
    @action setSkin = (skin) => {
        this.skin = skin;
    }
    @action showLogin = () => {
        this.isLoginShow = true;
    }
    @action hideLogin = () => {
        this.isLoginShow = false;
    }
}

export default new Store();
