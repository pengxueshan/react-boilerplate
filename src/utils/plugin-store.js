import {DEFAULT_PLUGINS} from './constants';
import Noop from '../components/noop';
import when from 'when';

export function loadPlugins() {
    if (!window.plugins) return when.resolve();
    return when.all(
        Object.keys(window.plugins.chunks).map(item => {
            if (item === 'core') return when.resolve();
            if (DEFAULT_PLUGINS.includes(item)) {
                return appendJS(window.plugins.chunks[item].entry);
            }
            return when.resolve();
        })
    );
}

function appendJS(src) {
    return when.promise(resolve => {
        let scriptDOM = document.createElement('script');
        scriptDOM.src = src;
        let body = document.getElementsByTagName('body')[0];
        body.appendChild(scriptDOM);
        scriptDOM.onload = () => {
            resolve();
        };
    });
}

let instance = null;

class PluginStore {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    register(pluginId, id, component) {
        if (!pluginId || !id || !component) return;
        if (!this.impl) {
            this.impl = {};
        }
        if (!this.impl[pluginId]) {
            this.impl[pluginId] = {};
        }
        this.impl[pluginId][id] = component;
    }

    remove(pluginId, id) {
        if (pluginId && !id) {
            if (this.impl) {
                delete this.impl[pluginId];
                return;
            }
        }
        if (pluginId && id) {
            if (this.impl && this.impl[pluginId]) {
                delete this.impl[pluginId][id];
            }
        }
    }

    getImpl(pluginId, id) {
        if (!pluginId || !id || !this.impl) return Noop;
        return this.impl[pluginId] && this.impl[pluginId][id] || Noop;
    }
}

export default new PluginStore();
