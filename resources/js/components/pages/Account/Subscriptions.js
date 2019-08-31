import { Switch } from 'antd';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import NotificationPrefSwitch from './NotificationPrefSwitch';
import { getNotificationPrefs } from '../../../actions/notificationActions';

class Subscriptions extends Component {
    componentDidMount() {
        this.props.getNotificationPrefs();
    }

    render() {
        const { isLoading, prefs } = this.props;

        return (
            <table className='table table-subscriptions'>
                <thead>
                    <tr>
                        <th className='topic-column'>Topic</th>
                        <th className='sms-column'>SMS</th>
                        <th className='email-column'>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>New Leads</td>
                        <td><NotificationPrefSwitch prefs={prefs} index={1} type='phone' /></td>
                        <td><NotificationPrefSwitch prefs={prefs} index={1} type='email' /></td>
                    </tr>
                    <tr>
                        <td>Billing Alerts</td>
                        <td><NotificationPrefSwitch prefs={prefs} index={2} type='phone' /></td>
                        <td><Switch loading={isLoading} disabled={true} checked={true}/></td>
                    </tr>
                    <tr>
                        <td>Product Updates</td>
                        <td><NotificationPrefSwitch prefs={prefs} index={3} type='phone' /></td>
                        <td><NotificationPrefSwitch prefs={prefs} index={3} type='email' /></td>
                    </tr>
                    <tr>
                        <td>Newsletter</td>
                        <td><NotificationPrefSwitch prefs={prefs} index={4} type='phone' /></td>
                        <td><NotificationPrefSwitch prefs={prefs} index={4} type='email' /></td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = state => ({
	isLoading: state.ui.notifications.loading,
    prefs: state.notifications.byId,
});

const mapDispatchToProps = dispatch => ({
	getNotificationPrefs: () => dispatch(getNotificationPrefs())
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);
