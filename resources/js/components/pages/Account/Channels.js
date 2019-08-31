import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteChannel, getChannels } from '../../../actions/channelActions';
import Exit from '../../icons/Exit'

class Channels extends Component {
    componentDidMount() {
        this.props.getChannels();
    }

    render() {
        const { channels } = this.props;

        if (_.isEmpty(channels)) {
            return <div></div>
        }

        return (
            <table className='table table-channels'>
                <thead>
                <tr>
                    <th className='type-column'>Type</th>
                    <th className='value-column'>Address</th>
                    <th className='status-column'>Status</th>
                    <th className='delete-column'></th>
                </tr>
                </thead>
                <tbody>
                    { this.renderChannelRows() }
                </tbody>
            </table>
        )
    }

    renderChannelRows() {
        const { channels } = this.props;

        const visibleChannels = channels.filter(i => !i.deleting);

        return visibleChannels.map((channel, index) => (
            <tr key={index}>
                <td>{this.capitalize(channel.type)}</td>
                <td>{channel.value}</td>
                <td>{this.renderStatus(channel.verified)}</td>
                <td onClick={() => this.deleteChannel(channel.id)}><Exit style={{ padding: '5px' }} /></td>
            </tr>
        ))
    }

    renderStatus(verified) {
        return verified
            ? <span className='is-verified'>Verified</span>
            : <span className='un-verified'>Unverified</span>
    }

    deleteChannel(id) {
        return this.props.deleteChannel(id);
    }

    capitalize(string) {
        return string.replace(/^\w/, c => c.toUpperCase());
    }
}

const mapStateToProps = state => {
    const { allIds, byId } = state.channels;

    return {
        channels: allIds.map(i => byId[i]),
    }
};

const mapDispatchToProps = dispatch => ({
    getChannels: () => dispatch(getChannels()),
    deleteChannel: id => dispatch(deleteChannel(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
