export function setItem(key, item, pluginId) {
    let storeKey = key;
    if (pluginId) {
        storeKey = `${pluginId}:${storeKey}`;
    }
    localStorage.setItem(storeKey, JSON.stringify(item));
}

export function getItem(key, pluginId) {
    let storeKey = key;
    if (pluginId) {
        storeKey = `${pluginId}:${storeKey}`;
    }
    let data = localStorage.getItem(storeKey);
    if (data === null || data === undefined) return data;
    return JSON.parse(localStorage.getItem(storeKey));
}

export function removeItem(key, pluginId) {
    let storeKey = key;
    if (pluginId) {
        storeKey = `${pluginId}:${storeKey}`;
    }
    localStorage.removeItem(storeKey);
}

export default {
    setItem,
    getItem,
    removeItem
}
