import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListingForm from '../forms/ListingForm';
import { createListing, cancelListingUpdate, updateListing } from '../../actions/listingActions';
import validateListing from '../../validation/listingValidation';
import ListingPreview from '../pages/Listings/ListingPreview';

class ListingModal extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        const isUpdating = !_.isEmpty(props.cleanListing);

        this.state = {
            creating: !isUpdating,
            updating: isUpdating
        }
    }

    componentWillUnmount() {
        this.props.stopEditing();
    }

    render() {
        const { listing } = this.props;

        return (
            <div className={'listing-modal'}>
                <ListingPreview listing={listing}/>
                <div className='listing-form'>
                    <ListingForm
                        onSubmit={this.handleSubmit}
                        onCancel={this.props.onClose}
                        isNew={this.state.creating}
                    />
                </div>
            </div>
        );
    }

    handleSubmit(values) {
        const { cleanListing } = this.props;

        let action = {};

        if (this.state.creating) {
            action.fn = this.props.addListing;
            action.args = [values];
        }

        if (this.state.updating) {
            action.fn = this.props.updateListing;
            action.args = [cleanListing.id, cleanListing, values];
        }

        return validateListing(values)
            .then(() => action.fn(...action.args))
            .then(() => this.props.onClose())
    }
}

const mapStateToProps = state => ({
    listing: _.get(state, 'form.listingForm.values', {})
})

const mapDispatchToProps = (dispatch, props) => ({
    addListing: listing => dispatch(createListing(listing)),
    stopEditing: () => dispatch(cancelListingUpdate()),
    updateListing: (id, prev, next) => dispatch(updateListing(id, prev, next)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingModal);
