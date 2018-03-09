import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Detail from './detail';

export default class Quote extends Component {
    render() {
        return (
            <div className="quote">
                <Route path="/quote/:market/:code" component={Detail} />
            </div>
        );
    }
}
