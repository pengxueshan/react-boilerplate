import $ from 'jquery';
import when from 'when';
import {Config, trade} from '@gf/gf-quote-sdk';
import QuoteManager from './quote-manager';
import safeinput from '../lib/safeinput';
import { version, os, env } from './env';

export function connectQuote() {
    //传递版本号和平台信息
    return doConfig.then(function() {
        let intVersion, deviceType;
        if (ELECTRON) {
            let strVersion = env.CONTAINER_VERSION || '';
            intVersion = parseInt(strVersion.replace(/\./g, ''));
            deviceType = 3;
            if (os == 'win32') {
                deviceType = 3;
            } else if (os == 'darwin') {
                deviceType = 4;
            }
        } else {
            intVersion = 510;
            deviceType = 3;
        }

        var quoteUrl = env['HIPPO_QUOTE_URL'];
        var quoteSites;
        if (quoteUrl) {
            var parts = quoteUrl.split(':');
            quoteSites = [
                {
                    'NAME': 'TEST',
                    'HOST': `${parts[0]}:${parts[1]}`,
                    'PORT': parts[2]
                }
            ];
        } else {
            if (ELECTRON) {
                quoteSites = [
                    {
                        'NAME': '电信1',
                        'HOST': 'ws://116.31.73.143',
                        'PORT': '9006/ws'
                    },
                    {
                        'NAME': '电信1-2',
                        'HOST': 'ws://113.108.212.24',
                        'PORT': '9006/ws'
                    },
                    {
                        'NAME': '联通1',
                        'HOST': 'ws://163.177.14.150',
                        'PORT': '9006/ws'
                    },
                    {
                        'NAME': '移动1',
                        'HOST': 'ws://183.232.222.11',
                        'PORT': '9006/ws'
                    },
                    {
                        'NAME': '电信2',
                        'HOST': 'ws://101.230.213.101',
                        'PORT': '9006/ws'
                    },
                    {
                        'NAME': '联通2',
                        'HOST': 'ws://140.207.19.197',
                        'PORT': '9006/ws'
                    },
                    {
                        'NAME': '移动2',
                        'HOST': 'ws://117.184.144.101',
                        'PORT': '9006/ws'
                    },
                    {
                        'NAME': '联通3',
                        'HOST': 'ws://123.126.108.135',
                        'PORT': '9006/ws'
                    },
                    {
                        'NAME': '云行情3',
                        'HOST': 'ws://119.18.207.5',
                        'PORT': '9006/ws'
                    }
                ];
            } else {
                quoteSites = [
                    {
                        'NAME': '云行情Q3',
                        'HOST': 'wss://q3.gf.com.cn',
                        'PORT': '1443/ws'
                    }
                    /*{
                        'NAME': '云行情3',
                        'HOST': 'ws://119.18.207.5',
                        'PORT': '9006/ws'
                    }*/
                ];
            }
        }

        QuoteManager.initQuote(quoteSites, intVersion, deviceType);

        //早盘和午盘开市重新订阅
        setInterval(() => {
            var date = new Date();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var curtime = hour * 100 + minute;
            if ((curtime >= 900 && curtime <= 905) || (curtime >= 1255 && curtime <= 1300)) {
                QuoteManager.siteReconnect();
            }
        }, 5 * 60 * 1000);
    });
}

function connectTrade() {
    return doConfig.then(function() {
        var tradeUrl = env['HIPPO_TRADE_URL'] || 'ws://10.2.148.85:80/ws',
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
        let opStation = `HIPPO|ver=${appVer}|ip=null|mac=${macAddr}|hdd=${hddSerial}|lan_ip=${ip}|site=http://hippo.gf.com.cn`;
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

function initCodeList() {
    return Promise.race([QuoteManager.initCodeList(), new Promise(resolve => {
        setTimeout(resolve, 8000, 0);
    })]);
}

export function connect() {
    return Promise.all([connectQuote(), connectTrade()]).then(initCodeList);
}
