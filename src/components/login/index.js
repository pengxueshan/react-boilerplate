import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Redirect} from 'react-router-dom';

@inject(stores => {
    let {
        setLogined,
        isLogined
    } = stores.app;
    return {
        setLogined,
        isLogined
    };
})
@observer
export default class Login extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.setLogined(true);
        }, 1000);
    }

    render () {
        const {from} = this.props.location.state || {from: {pathname: '/'}};

        if (this.props.isLogined) {
            return <Redirect to={from} />;
        }
        return (
            <div>login</div>
        );
    }
}
