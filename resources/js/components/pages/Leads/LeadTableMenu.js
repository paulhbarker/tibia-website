import React, { Component } from 'react';
import { connect } from 'react-redux';
import Trash from '../../icons/Trash';
import Tray from '../../icons/Tray';
import Link from '../../icons/Link';
import Watch from '../../icons/Watch';
import WatchFilled from '../../icons/WatchFilled';
import { markLeadAsUnread, markLeadAsViewed, deleteLead } from '../../../actions/leadActions';
import IconButton from '../../buttons/IconButton';

class LeadTableMenu extends Component {
    constructor(props) {
        super(props);

        this.handleViewClick = this.handleViewClick.bind(this);
        this.handleTrashClick = this.handleTrashClick.bind(this);
    }

    render() {
        const { lead } = this.props;
        const isNewLead = !lead.viewed;

        return (
            <div className='menu-inner'>
                <IconButton onClick={this.handleViewClick}>
                    { isNewLead ? <WatchFilled /> : <Watch /> }
                </IconButton>
                {/*<IconButton icon={Link} />*/}
                {/*<IconButton icon={Tray} />*/}
                <IconButton icon={Trash} onClick={this.handleTrashClick}/>
            </div>
        )
    }

    handleViewClick(e) {
        e.stopPropagation();

        const { lead } = this.props;

        if (!lead.viewed) {
            this.props.markAsViewed(lead.id);
        } else {
            this.props.markAsUnread(lead.id);
        }
    }

    handleTrashClick(e) {
        e.stopPropagation();

        const { lead } = this.props;

        this.props.deleteLead(lead);
    }
}

const mapDispatchToProps = dispatch => ({
    markAsViewed: id => dispatch(markLeadAsViewed(id)),
    markAsUnread: id => dispatch(markLeadAsUnread(id)),
    deleteLead: lead => dispatch(deleteLead(lead))
});

export default connect(null, mapDispatchToProps)(LeadTableMenu);
