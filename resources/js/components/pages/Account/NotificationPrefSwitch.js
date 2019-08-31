import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'antd';
import { subscribe, unsubscribe } from '../../../actions/notificationActions';

class NotificationPrefSwitch extends Component {
    render() {
        const { isLoading, prefs, index, type } = this.props;

        return (
            <Switch
                loading={isLoading}
                checked={_.get(prefs, [index, type], false)}
                onChange={checked => this.handleChange(checked, index, type)}
            />
        );
    }

    handleChange(checked, index, type) {
        checked ? this.subscribe(index, type) : this.unsubscribe(index, type);
    }

    subscribe(index, type) {
        this.props.subscribeToNotif(index, type);
    }

    unsubscribe(index, type) {
        this.props.unsubFromNotif(index, type);
    }
}

const mapStateToProps = state => ({
    isLoading: state.ui.notifications.loading,
})

const mapDispatchToProps = dispatch => ({
    subscribeToNotif: (id, type) => dispatch(subscribe(id, type)),
    unsubFromNotif: (id, type) => dispatch(unsubscribe(id, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPrefSwitch);
