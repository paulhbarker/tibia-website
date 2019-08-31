import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import ListingTableMenu from './ListingTableMenu';

class ListingTableRow extends Component {
    constructor(props) {
        super(props);

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

        this.state = {
            mouseOverMenu: false
        }
    }

    render() {
        const { listing } = this.props;

        return (
            <tr onClick={e  => this.props.onClick(e)}
                onMouseOver={this.handleMouseOver}
                onMouseLeave={this.handleMouseLeave}
            >
                <td className='address'>{listing.address}</td>
                <td className={this.state.mouseOverMenu ? 'menu' : 'date'}>
                    {this.renderDateOrMenu(listing)}
                </td>
            </tr>
        );
    }

    handleMouseOver() {
        this.setState({ mouseOverMenu: true });
    }

    handleMouseLeave() {
        this.setState({ mouseOverMenu: false });
    }

    renderDateOrMenu(listing) {
        if (this.state.mouseOverMenu) {
            return <ListingTableMenu listing={listing}/>
        }

        return this.formatDate(listing.created_at)
    }

    formatDate(date) {
        const received = moment.utc(date);

        if (received.isSame(moment(), 'day')) {
            return received.local().format('h:mm A');
        }

        return received.local().format('MMM D');
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ListingTableRow);
