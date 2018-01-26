import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Popup, Input} from 'codish-ui';
import {inject, observer} from 'mobx-react';
import {trade} from '@gf/gf-quote-sdk';
import safeinput from '../../utils/safeinput';
import when from 'when';

import './index.css';

@inject(stores => {
    let {
        hideLogin
    } = stores.app;
    return {
        hideLogin
    };
})
@observer
export default class LoginPopup extends Component {
    state = {
        clientAccount: '',
        password: '',
        verifyCode: '',
        needVerifyCode: false
    }

    componentDidMount() {
        this.passwordInput = safeinput.init(this.passwordRef.getInputRef());
    }


    handleClientAccountChange = v => {
        this.setState({
            clientAccount: v
        });
    }

    renderVerifyCode = () => {}

    checkNeedVerify = () => {
        let params = {
            clientAccount: this.state.clientAccount,
            assetProp: '0'
        };
        trade.askLoginCode(params).then(rsp => {
            this.setState({
                needVerifyCode: (rsp && rsp.needVerifyCode) || false
            });
        });
    }

    login = () => {
        this.checkLoginParams().then(result => {
            if (!result.params) {
                return this.setState({
                    error: result.error || '参数有误'
                });
            }
            let params = result.params;
            trade.login(params).then(this.handleLoginResponse, this.handleLoginResponse);
        });
    }

    checkLoginParams = () => {
        return when.promise((resolve) => {
            let {clientAccount, needVerifyCode, verifyCode} = this.state;
            if (!clientAccount) {
                return resolve({
                    params: false,
                    error: '请输入客户号'
                });
            }
            if (needVerifyCode && !verifyCode) {
                return resolve({
                    params: false,
                    error: '请输入验证码'
                });
            }
            this.passwordInput.getAll(['password'], password => {
                let params = {
                    clientAccount,
                    password,
                    assetProp: '0'
                };
                if (needVerifyCode) {
                    params.verifycode = verifyCode
                }
                resolve({
                    params
                });
            });
        });
    }

    handleLoginResponse = rsp => {
        if (rsp && rsp.error && rsp.error.code == '0') {
            return this.props.hideLogin();
        }
        if (rsp && rsp.error && rsp.error.code != '0') {
            this.setState({
                error: rsp.error.desc
            });
        }
    }

    renderVerifyCode() {
        if (!this.state.needVerifyCode) {
            return null;
        }
        return (
            <div className="form-item">
                <Input
                    label="验证码"
                    labelWidth={60}
                    renderExtra={this.renderVerifyCode}
                    inner />
            </div>
        );
    }

    handlePasswordChange = v => {
        this.setState({
            password: v
        });
    }

    handleBtnClick = index => {
        if (index == 0) {
            this.login();
        } else {
            return true;
        }
    }

    render() {
        return (
            <Popup
                title="登录"
                onClose={this.props.hideLogin}
                buttons={['登录', '取消']}
                onBtnClick={this.handleBtnClick}>
                <div className="login-popup">
                    <div className="form-item">
                        <Input
                            label="客户号"
                            type="int"
                            labelWidth={60}
                            onChange={this.handleClientAccountChange}
                            onBlur={this.checkNeedVerify} />
                    </div>
                    <div className="form-item">
                        <Input
                            label="密码"
                            nativeType="password"
                            labelWidth={60}
                            ref={node => this.passwordRef = node}
                            onChange={this.handlePasswordChange} />
                    </div>
                    {this.renderVerifyCode()}
                    <div className="form-item error">{this.state.error}</div>
                </div>
            </Popup>
        );
    }
}

LoginPopup.propTypes = {
    hideLogin: PropTypes.func
};
