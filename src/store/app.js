import {observable, action} from 'mobx';
import ConfigStore from '../utils/config-store';

class Store {
    @observable skin = ConfigStore.getItem('skin') || 'dark';
    @action setSkin = (skin) => {
        this.skin = skin;
    }
}

export default new Store();
