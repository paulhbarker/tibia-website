import React, { Component } from 'react';

class ConfirmField extends Component {
    render() {
        return (
            <div className="confirm-field">
                <div className="title">{this.props.title}</div>
                <div className="value">{this.props.value}</div>
            </div>
        );
    }
}

export default ConfirmField;
