import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getListings, startEditingListing } from '../../../actions/listingActions';
import { loadListingControls, clearControls } from '../../../actions/uiActions';
import { showModal, setModal } from '../../../actions/modalActions';
import RippleLoader from '../../loaders/RippleLoader';
import ListingTableRow from './ListingTableRow';
import PageCard from '../../layout/PageCard';

class ListingTable extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.fetchListings();
        this.props.loadControls();
    }

    componentWillUnmount() {
        this.props.clearControls();
    }

    render() {
        if (this.shouldShowLoader()) {
            return (
                <div className='fill-page'>
                    <RippleLoader width={88} height={88} stroke={1}/>
                </div>
            )
        }

        if (this.hasNoListings()) {
            return (
                <PageCard>
                    <h2>Add Some Listings</h2>
                    <p>
                        This is where you'll keep track of all your listings. The listings
                        you add here will be displayed to potential clients who text your
                        keyword to <code>50505</code>. To add a listing, click the <code>+</code> in
                        the upper left-hand corner of this page.
                    </p>
                </PageCard>
            )
        }

        return (
            <table className='table table-listings'>
                <tbody>
                    {this.renderListings()}
                </tbody>
            </table>
        )
    }

    renderListings() {
        const { listings, pageOffset, perPage } = this.props;

        const sortedListings = _.orderBy(listings, i => i.created_at, 'desc');
        const listingsOnPage = sortedListings.slice(pageOffset, pageOffset + perPage)
        const listingsToRender = listingsOnPage.filter(i => !i.deleting);

        return listingsToRender.map(listing => {
            return (
                <ListingTableRow key={listing.id} listing={listing} onClick={() => this.handleClick(listing)}/>
            )
        })
    }

    hasNoListings() {
        return _.isEmpty(this.props.listings);
    }

    shouldShowLoader() {
        return this.props.isLoading;
    }

    handleClick(listing) {
        this.props.startListingEdit(listing);

        this.props.setModal('listing', listing);
        this.props.showModal();
    }
}

const mapStateToProps = state => {
    const { currentPage, perPage } = state.pagination.listings;

    return {
        perPage: perPage,
        pageOffset: (currentPage - 1) * perPage,
        listings: state.listings.allIds.map(i => state.listings.byId[i]),
        isLoading: state.ui.listings.loading
    }
}

const mapDispatchToProps = dispatch => ({
    fetchListings: () => dispatch(getListings()),
    loadControls: () => dispatch(loadListingControls()),
    clearControls: () => dispatch(clearControls()),
    setModal: (type, data) => dispatch(setModal(type, data)),
    showModal: () => dispatch(showModal()),
    startListingEdit: listing => dispatch(startEditingListing(listing)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListingTable);
