import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Redirect} from 'react-router-dom';

@inject(stores => {
    let {isLogined} = stores.app;
    return {
        isLogined
    };
})
@observer
export default class User extends Component {
    render() {
        if (!this.props.isLogined) {
            return (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: this.props.location}
                }} />);
        }
        return (
            <div>user loaded</div>
        );
    }
}
