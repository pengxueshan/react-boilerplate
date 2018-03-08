import {observable, action, computed} from 'mobx';
import {getItem} from '../../../utils/config-store';
import {SEARCH_HISTORY_KEY} from './constants';

class Store {
    @observable searchList = [];
    @observable isFocus = false;
    @observable historyList = [];

    @computed get isShowLayer() {
        return this.searchList.length > 0 || this.historyList.length > 0;
    }

    @action setSearchList = (list) => {
        this.searchList = list || [];
    }
    @action setIsFocus = isFocus => {
        this.isFocus = !!isFocus;
    }
    @action setHistoryList = (data) => {
        if (data) {
            this.historyList = data;
        } else {
            this.historyList = getItem(SEARCH_HISTORY_KEY);
        }
    }
    @action clearList = () => {
        this.searchList = [];
        this.historyList = [];
    }
}

let searchStore = new Store();

export default {
    searchStore
};
