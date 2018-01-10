import {getBinary} from './index';
import algo from 'exports-loader?exports.algo.core!../lib/algo';

var encrypt, getMac, getSerial, getMacAddr, getHddSerial, getVersion, getSign;

function gatherOutput(p, cbk, input) {
    var chunk = '';
    p.stdout.on('data', (data) => {
        chunk += data;
    });

    p.on('error', function() {
        cbk('');
        // err.code, err.message
    });

    p.on('close', (code) => {
        cbk(code == 0 ? chunk.trim() : '');
    });

    if (input !== undefined) {
        p.stdin.end(e(input));
    }
}

if (ELECTRON) {
    const spawn = window.require('child_process').spawn;

    var loginHelper = getBinary('loginhelper');
    encrypt = function(txt, cbk) {
        let p = spawn(loginHelper, ['getenc'], {
            stdio: 'pipe'
        });
        gatherOutput(p, cbk, txt);
    };
    getSign = function(txt, cbk) {
        let p = spawn(loginHelper, ['getsign'], {
            stdio: 'pipe'
        });
        gatherOutput(p, cbk, txt);
    };
    getMac = function(cbk) {
        let p = spawn(loginHelper, ['getmac'], {
            stdio: 'pipe'
        });
        gatherOutput(p, function(data) {
            encrypt(data.trim(), function(data) {
                cbk(data);
            });
        });
    };
    getMacAddr = function(cbk) {
        /* this one does not encrypt */
        let p = spawn(loginHelper, ['getmac'], {
            stdio: 'pipe'
        });
        gatherOutput(p, function(data) {
            cbk(data.trim());
        });
    };
    getSerial = function(cbk) {
        let p = spawn(loginHelper, ['getserial'], {
            stdio: 'pipe'
        });
        gatherOutput(p, function(data) {
            encrypt(data.trim(), function(data) {
                cbk(data);
            });
        });
    };
    getHddSerial = function(cbk) {
        let p = spawn(loginHelper, ['getserial'], {
            stdio: 'pipe'
        });
        gatherOutput(p, function(data) {
            cbk(data.trim());
        });
    };
    getVersion = function(cbk) {
        let p = spawn(loginHelper, ['version'], {
            stdio: 'pipe'
        });
        gatherOutput(p, function(data) {
            cbk(data.trim());
        });
    };
} else {
    let host = 'https://localhost.gf.com.cn:37022';

    encrypt = function(txt, cbk) {
        httpPOST(`${host}/getenc`, e(txt), cbk);
    };

    getSign = function(txt, cbk) {
        httpPOST(`${host}/getsign`, e(txt), cbk);
    };

    getMac = function(cbk) {
        httpGET(`${host}/getmac`, function(mac) {
            encrypt(mac.trim(), cbk);
        });
    };

    getMacAddr = function(cbk) {
        /* this one does not encrypt */
        httpGET(`${host}/getmac`, function(mac) {
            cbk(mac.trim());
        });
    };

    getSerial = function(cbk) {
        httpGET(`${host}/getserial`, function(serial) {
            encrypt(serial.trim(), cbk)
        });
    };

    getHddSerial = function(cbk) {
        httpGET(`${host}/getserial`, function(serial) {
            cbk(serial.trim(), cbk)
        });
    };

    getVersion = function(cbk) {
        httpGET(`${host}/version`, function(txt) {
            cbk(txt.trim(), cbk)
        });
    };
}

var apis = {
    mac: getMac,
    hdd: getSerial,
    macAddr: getMacAddr,
    hddSerial: getHddSerial,
    version: getVersion,
    sign: getSign
};

class Input {
    constructor($ipt) {
        this.$ipt = $ipt;
    }

    isEmpty() {
        return !this.$ipt.value;
    }

    clear() {
        this.$ipt.value = '';
    }

    verify(keyCode, limit) {
        let value = this.$ipt.value + String.fromCharCode(keyCode);
        for (var v in limit) {
            if (limit.hasOwnProperty(v)) {
                switch (v) {
                    case 'maxLength':
                        if (window.getSelection().toString().length == 0 && value.length > limit.maxLength.val) {
                            return limit.maxLength;
                        }
                        break;
                    case 'regExp':
                        if (!limit.regExp.val.test(value)) {
                            return limit.regExp;
                        }
                        break;
                }
            }
        }
        return {};
    }

    getValue(cbk) {
        encrypt(this.$ipt.value, cbk);
    }

    /* get password, mac, hdd */
    getAll(items, cbk) {
        var args = [cbk].concat(items.map((key) => {
            if (key == 'password') return this.getValue.bind(this);
            return apis[key];
        }));
        aggregate.apply(null, args);
    }
}

export default {
    init($input) {
        return new Input($input);
    },
    getAll(items, cbk) {
        var args = [cbk].concat(items.map(function (key) {
            return apis[key];
        }));
        aggregate.apply(null, args);
    },
    getMac(cbk) {
        getMac(cbk);
    },
    getSerial(cbk) {
        getSerial(cbk);
    },
    getMacAddr(cbk) {
        getMacAddr(function (addr) {
            cbk((addr || '').split(',')[0], addr);
        });
    },
    getVersion(cbk) {
        getVersion(cbk);
    },
    getSign(txt, cbk) {
        getSign(txt, function (data) {
            cbk(algo.d(data));
        });
    }
};

//////////////////////////////////////
///////////////// lib ////////////////
//////////////////////////////////////

function httpGET(url, cbk) {
    var req = new XMLHttpRequest();
    req.onload = function (evt) {
        cbk(evt.target.responseText);
    };
    req.onerror = function () {
        cbk('');
    };
    req.open('GET', url);
    req.send();
}

function httpPOST(url, body, cbk) {
    var req = new XMLHttpRequest();
    req.onload = function (evt) {
        cbk(evt.target.responseText);
    };
    req.onerror = function () {
        cbk('');
    };
    req.open('POST', url);
    req.setRequestHeader('Content-Type', 'text/plain');
    req.send(body);
}

function aggregate(cbk, ...fn) {
    var done = 0,
        ret = [];
    fn.forEach(function (_fn, i) {
        _fn(function (_ret) {
            ret[i] = _ret;
            done++;

            if (cbk && done == fn.length) {
                cbk.apply(null, ret);
                // ensure cbk is called only once
                cbk = null;
            }
        });
    });
}

function e(txt) {
    // forget about it
    /*
    var h = k(10);
    return h + t(h, txt);
    */
    return txt;
}

/*
function t(h, txt) {
    var chars = [];
    var j = 0, s = 1;
    for (var i = 0; i < txt.length; i++) {
        var n = (txt.charCodeAt(i) ^ h.charCodeAt(j)).toString(16);
        chars.push(n.length == 1 ? '0' + n : n);
        j += s;
        if (j + s == -1 || j + s == h.length) {
            s *= -1
        }
    }
    var ans = chars.join('');
    return ans
}
*/

/*function k(len) {
    var ranges = [[48, 57], [65, 90], [97, 122]],
		total = 0;
    for (var i = 0; i < ranges.length; i++) {
        total += ranges[i][1] - ranges[i][0] + 1;
    }
    var chars = [];
    for (var i = 0; i < len; i++) {
        var n = Math.floor(Math.random() * total);
        for (var j = 0; j < ranges.length; j++) {
            var d = ranges[j][1] - ranges[j][0] + 1;
            if (n >= d) {
                n -= d;
            } else {
                chars.push(String.fromCharCode(n + ranges[j][0]));
                break;
            }
        }
    }
    return chars.join('');
}*/
