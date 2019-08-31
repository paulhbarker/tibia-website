import { Button, Popover } from 'antd';
import Channels from './Channels';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Subscriptions from './Subscriptions';
import PageCard from '../../layout/PageCard';
import PageContent from '../../layout/PageContent';
import RippleLoader from '../../loaders/RippleLoader';
import { setModal, showModal } from '../../../actions/modalActions';

class Notifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            sending: true,
            error: false
        }

        this.handleVisibleChange = this.handleVisibleChange.bind(this);
    }

    render() {
        return (
            <PageContent title={'Notifications'}>
                <PageCard>
                    <h2>General Notifications {this.renderNotifLoader()}</h2>
                    <p>
                        In the event that you subscribe to these general notifications,
                        we will send emails and text messages to the channels you set up below.
                        Please note that notifications will only be sent to verified notification channels.
                    </p>
                    <Subscriptions />
                </PageCard>
                <PageCard>
                    <h2>
                        Notification Channels {this.renderChannelLoader()}
                        <Button
                            size='small'
                            style={{ marginLeft: 'auto' }}
                            onClick={() => this.openChannelModal()}
                        >Add Channel</Button>
                    </h2>
                    <p className='m-b-40'>
                        In order to receive notifications, we need to know where to notify you.
                        We also need to make sure that channel belongs to you! We send out verification
                        messages when you add a channel, but in the event you don't receive a
                        verification message, you may
                        <Popover
                            content={this.renderTooltipInfo()}
                            trigger="click"
                            visible={this.state.visible}
                            onVisibleChange={this.handleVisibleChange}
                        >
                            <a onClick={() => this.sendAgain()}> send them again</a>.
                        </Popover>
                    </p>
                    <Channels />
                </PageCard>
            </PageContent>
        );
    }

    handleVisibleChange(visible) {
        this.setState({ ...this.state, visible });
    }

    renderTooltipInfo() {
        if (this.state.sending) {
            return <span>Sending <RippleLoader height={12} width={12} /></span>
        }

        if (this.state.error) {
            return <span>Sending failed. Wait a couple minutes before trying again!</span>
        }

        return <span>Verifications sent!</span>
    }

    openChannelModal() {
        this.props.setModal('channel', {});
        this.props.showModal();
    }

    sendAgain() {
        this.setState({ ...this.state, sending: true });
        axios.post('/api/v1/channels/verify')
            .then(() => {
                this.setState({ ...this.state, sending: false });
            })
            .catch(() => {
                this.setState({ ...this.state, sending: false, error: true });
            })
    }


    renderNotifLoader() {
        if (this.props.notificationsLoading) {
            return <RippleLoader height={24} width={24} />
        }
    }

    renderChannelLoader() {
        if (this.props.channelsLoading) {
            return <RippleLoader height={24} width={24} />
        }
    }
};

const mapStateToProps = state => ({
    notificationsLoading: state.ui.notifications.loading,
    channelsLoading: state.ui.channels.loading,
    settings: state.settings.notifications,
});

const mapDispatchToProps = dispatch => ({
    showModal: () => dispatch(showModal()),
    setModal: (type, data) => dispatch(setModal(type, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
