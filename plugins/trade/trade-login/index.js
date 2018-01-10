import React, {Component} from 'react';
import {trade} from '@gf/gf-quote-sdk';
import safeinput from 'trader/safeinput';

export default class TradeLogin extends Component {
    state = {
        clientAccount: '',
        password: '',
        verifyCode: '',
        needVerifyCode: false,
        verifyCodeImg: '',
        error: ''
    }

    componentDidMount() {
        this.checkIsNeedCode();
    }

    checkIsNeedCode = () => {
        if (!this.state.clientAccount) return;
        safeinput.getMacAddr((mac, all) => {
            let ipAddr = (all || '').split(',')[1];
            let params = {
                clientAccount: this.state.clientAccount,
                ipAddr,
                macAddr: mac,
                assetProp: '0'
            };
            trade.askLoginCode(params).then(rsp => {
                if (rsp && !!rsp.needVerifyCode) {
                    this.setState({
                        needVerifyCode: true
                    }, this.getVerifyCode);
                }
            });
        });
    }

    getVerifyCode = () => {
        if (!this.state.clientAccount) return;
        safeinput.getAll(['macAddr'], mac => {
            let macAddr = (mac || '').split(',')[0];
            let ipAddr = (mac || '').split(',')[1];
            trade.getVerifyCode({
                clientAccount: this.state.clientAccount,
                ipAddr,
                macAddr
            }).then(rsp => {
                this.setState({
                    verifyCodeImg: 'data:image/png;base64,' + btoa(String.fromCharCode.apply(null, new Uint8Array(rsp.imgbuf))),
                    verifyCode: ''
                });
            });
        });
    }

    renderVerifyCode = () => {
        if (this.state.needVerifyCode) {
            return (
                <div>
                    <input
                        value={this.state.verifyCode}
                        type="text"
                        onChange={this.handleVerifyCodeChange}
                        placeholder="验证码" />
                    <img
                        src={this.state.verifyCodeImg}
                        onClick={this.getVerifyCode} />
                </div>
            );
        }
        return null;
    }

    handleClientAccountChange = (e) => {
        this.setState({
            clientAccount: e.target.value.trim()
        });
    }

    handlePasswordChange = e => {
        this.setState({
            password: e.target.value
        });
    }

    handleVerifyCodeChange = e => {
        this.setState({
            verifyCode: e.target.value
        });
    }

    handleLoginClick = () => {
        this.passwordInput.getAll(['password'], password => {
            let {clientAccount, verifyCode} = this.state;
            trade.login({
                clientAccount,
                password,
                assetProp: '0',
                verifycode: verifyCode,
                expireTime: 1000 * 60 * 10
            }).then(() => {}, rsp => {
                this.setState({
                    error: rsp.error && rsp.error.desc
                });
                this.checkIsNeedCode();
            });
        });
    }

    render() {
        return (
            <div className="trade-login">
                <input
                    value={this.state.clientAccount}
                    type="text"
                    onChange={this.handleClientAccountChange}
                    placeholder="客户号"
                    onBlur={this.checkIsNeedCode} />
                <input
                    ref={node => this.passwordInput = safeinput.init(node)}
                    value={this.state.password}
                    type="password"
                    onChange={this.handlePasswordChange}
                    placeholder="密码" />
                {this.renderVerifyCode()}
                <button onClick={this.handleLoginClick}>登录</button>
                <div>{this.state.error}</div>
            </div>
        );
    }
}
