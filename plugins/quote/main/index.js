import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';

export default class Quote extends Component {
    render() {
        return (
            <div>
                <Link to="/quote/1">行情1</Link>
                <Link to="/quote/2">行情2</Link>
                <Route path="/quote/1" render={() => <div>1</div>} />
                <Route path="/quote/2" render={() => <div>2</div>} />
            </div>
        );
    }
}
