import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {SKIN} from '../../utils/constants';

import './index.css';

@inject(stores => {
    let {
        setSkin,
        skin
    } = stores.app;
    return {
        setSkin,
        skin
    };
})
@observer
export default class SkinManager extends Component {
    static propTypes = {
        setSkin: PropTypes.func,
        skin: PropTypes.string
    };

    setSkin = (e) => {
        let checked = e.target.checked;
        let skin = e.target.dataset['skin'];
        if (checked && skin) {
            this.props.setSkin(skin);
        }
    }

    renderSkin = () => {
        return SKIN.map(item => {
            return (
                <label key={item.name}>
                    <input
                        checked={this.props.skin === item.name}
                        onChange={this.setSkin}
                        type="radio"
                        data-skin={item.name} />
                    {item.text}
                </label>
            );
        });
    }

    render() {
        return (
            <div className="skin-manager">
                {this.renderSkin()}
            </div>
        );
    }
}
