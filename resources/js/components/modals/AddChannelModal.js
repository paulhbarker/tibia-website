import { connect } from 'react-redux';
import React, { Component } from 'react';
import ChannelForm from '../forms/ChannelForm';
import { addChannel } from '../../actions/channelActions';
import { validateEmail, validatePhone } from '../../validation/channelValidation';

class AddChannelModal extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div className={'channel-modal'}>
                <h2>Add Notification Channel</h2>
                <ChannelForm onSubmit={this.handleSubmit} onCancel={this.props.onClose}/>
            </div>
        );
    }

    handleSubmit(values) {
        let validate;

        if (values.type === 'phone') {
            validate = validatePhone;
        }

        if (values.type === 'email') {
            validate = validateEmail;
        }

        return validate(values.value)
            .then(() => this.props.addChannel(values))
            .then(() => this.props.onClose());
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    addChannel: values => dispatch(addChannel(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddChannelModal);
