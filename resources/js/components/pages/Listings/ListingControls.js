import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '../../buttons/IconButton';
import Chevron from '../../icons/Chevron';
import { setListingsPagination } from '../../../actions/paginationActions';
import Plus from '../../icons/Plus';
import Watch from '../../icons/Watch';
import { showModal, setModal } from '../../../actions/modalActions';

class ListingControls extends Component {
    componentWillMount() {
        const { totalPages } = this.props

        this.props.setPagination({ currentPage: 1, totalPages });
    }

    constructor(props) {
        super(props);

        this.incrementPage = this.incrementPage.bind(this);
        this.decrementPage = this.decrementPage.bind(this);
        this.showAddListingModal = this.showAddListingModal.bind(this);
    }

    render() {
        return (
            <div className='control-wrapper'>
                <IconButton icon={Plus} onClick={this.showAddListingModal}/>
                <div className='pagination'>
                    { this.renderPaginationInfo() }
                    <IconButton onClick={this.decrementPage}><Chevron direction={'left'}/></IconButton>
                    <IconButton onClick={this.incrementPage}><Chevron direction={'right'}/></IconButton>
                </div>
            </div>
        );
    }

    showAddListingModal() {
        this.props.setModal('listing', {});
        this.props.showModal();
    }

    renderPaginationInfo() {
        const { start, end } = this.calcStartAndEnd()

        const total = this.props.totalListings;

        return (
            <div className='page-info'>
                {this.f(start)} - {this.f(end)} of {this.f(total)}
            </div>
        )
    }

    calcStartAndEnd() {
        const { currentPage, perPage, totalListings } = this.props

        const start = (currentPage - 1) * perPage + 1;
        let end = currentPage * perPage;

        if (end > totalListings) {
            end = totalListings;
        }

        return { start, end };
    }

    incrementPage() {
        const { currentPage, totalPages } = this.props

        if (currentPage === totalPages) {
            return;
        }

        const options = {
            currentPage: currentPage + 1,
            totalPages: totalPages,
        }

        this.props.setPagination(options);
    }

    decrementPage() {
        const { currentPage, totalPages } = this.props

        if (currentPage === 1) {
            return;
        }

        const options = {
            currentPage: currentPage - 1,
            totalPages: totalPages,
        }

        this.props.setPagination(options);
    }

    f(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

const mapStateToProps = state => {
    const { allIds, byId } = state.listings;
    const { perPage, currentPage } = state.pagination.listings;

    return {
        perPage: perPage,
        listingsById: byId,
        currentPage: currentPage,
        totalListings: allIds.length,
        pageOffset: (currentPage - 1) * perPage,
        totalPages: Math.ceil(allIds.length / perPage),
    }
}

const mapDispatchToProps = dispatch => ({
    showModal: () => dispatch(showModal()),
    setModal: (type, data) => dispatch(setModal(type, data)),
    setPagination: options => dispatch(setListingsPagination(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingControls);
