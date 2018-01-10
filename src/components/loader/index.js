import React, {Component} from 'react';
import './index.css';

export default class Loader extends Component {
    render() {
        return (
            <div className="loader">
                <span className="red"></span>
                <span className="blue"></span>
            </div>
        );
    }
}
