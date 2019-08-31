import React, { Component } from 'react';
import { connect } from 'react-redux';
import Trash from '../../icons/Trash';
import Link from '../../icons/Link';
import IconButton from '../../buttons/IconButton';
import { deleteListing } from '../../../actions/listingActions';

class ListingTableMenu extends Component {
    constructor(props) {
        super(props);

        this.handleTrashClick = this.handleTrashClick.bind(this);
    }

    render() {
        const { listing } = this.props;

        return (
            <div className='menu-inner'>
                <IconButton icon={Link} onClick={e => this.handleLinkClick(e, listing)}/>
                <IconButton icon={Trash} onClick={e => this.handleTrashClick(e, listing)}/>
            </div>
        )
    }

    handleLinkClick(e, listing) {
        e.stopPropagation();

        if (!listing.details) {
            return;
        }

        const win = window.open(listing.details, '_blank');
        win.focus();
    }

    handleTrashClick(e, listing) {
        e.stopPropagation();

        this.props.deleteListing(listing.id);
    }
}

const mapDispatchToProps = dispatch => ({
    deleteListing: id => dispatch(deleteListing(id))
});

export default connect(null, mapDispatchToProps)(ListingTableMenu);
