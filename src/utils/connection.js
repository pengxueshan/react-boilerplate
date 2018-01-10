import $ from 'jquery';
import when from 'when';
import {Config, trade} from '@gf/gf-quote-sdk';
import safeinput from './safeinput';
import {version, os, env} from './env';

function connectTrade() {
    return doConfig.then(function() {
        var tradeUrl = env['HIPPO_TRADE_URL'] || 'ws://10.2.148.84:80/ws',
            tradeUrls = env['HIPPO_TRADE_URLS'];
        if (tradeUrls) {
            return JSON.parse(tradeUrls).map((s, i) => {
                return {
                    name: `交易测试${i + 1}`,
                    url: s
                };
            });
        } else if (tradeUrl) {
            return [{
                name: '交易测试',
                url: tradeUrl
            }];
        } else {
            return getTradeGateWay().then(function (conf) {
                return (conf.HIPPO3 || []).map(site => {
                    return {
                        name: site.NAME,
                        url: `${site.HOST}:${site.PORT}/ws`
                    }
                });
            });
        }
    }).then(function(sites) {
        trade.init({
            type: 'web',
            site: sites
        });
        trade.session.restoreSession();
    });
}

function getTradeGateWay() {
    return $.ajax({
        url: 'https://cdn.gfzq.cn/hippo3/gatewaylist.js',
        dataType: 'jsonp',
        jsonpCallback: 'gatewayCallback',
        cache: false
    });
}

let doConfig = when.promise(function (resolve) {
    safeinput.getAll(['macAddr', 'hddSerial'], (mac, hddSerial) => {
        let macAddr = (mac || '').split(',')[0];
        let ip = (mac || '').split(',')[1];
        let appVer;
        if (ELECTRON) {
            appVer = os + '-' + version.containerVersion;
        } else {
            appVer = 'web';
        }
        let opStation = `HIPPO|ver=${appVer}|ip=${ip}|mac=${macAddr}|hdd=${hddSerial}|lan_ip=null|site=http://hippo.gf.com.cn`;
        Config.set({
            softwareVer: 360,
            deviceType: 3,
            gzipCodeList: false,
            tradeAppid: 'hippowin20170901',
            tradeAuthCode: '9yulw@265pkc',
            tradeOpStation: opStation
        });
        resolve();
    });
});

export function connect() {
    return connectTrade();
}
