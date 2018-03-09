import React, {Component} from 'react';

export default class Detail extends Component {
    render() {
        return (
            <div className="quote-detail">
                quote-detail {this.props.match.params.market} {this.props.match.params.code}
            </div>
        );
    }
}
