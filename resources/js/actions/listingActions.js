import {
    DELETE_LISTING_PENDING, DELETE_LISTING_SUCCESS,
    GET_LISTINGS_FAILURE,
    GET_LISTINGS_PENDING,
    GET_LISTINGS_SUCCESS,
    START_LISTING_EDIT,
    UPDATE_LISTING_CANCEL,
    UPDATE_LISTING_PENDING,
    UPDATE_LISTING_SUCCESS,
    UPDATE_LISTING_FAILURE, CREATE_LISTING_PENDING, CREATE_LISTING_SUCCESS, CREATE_LISTING_FAILURE, DELETE_LEAD_SUCCESS,
    DELETE_LEAD_FAILURE, DELETE_LEAD_PENDING, DELETE_LISTING_FAILURE
} from './types';
import API from '../api/listingsApi';
import { listingCollection } from '../schemas/listingSchema';

const fakeAPILatency = 750;

export const getListings = () => {
    return {
        types: [GET_LISTINGS_PENDING, GET_LISTINGS_SUCCESS, GET_LISTINGS_FAILURE],
        shouldCallAPI: state => _.isEmpty(state.listings.allIds) && !state.ui.listings.loading,
        callAPI: () => API.getListings(),
        schema: listingCollection
    }
}

export const deleteListing = id => {
    return {
        types: [DELETE_LISTING_PENDING, DELETE_LISTING_SUCCESS, DELETE_LISTING_FAILURE],
        callAPI: () => API.deleteListing(id),
        subject: id
    }
}

export const startEditingListing = listing => {
    return { type: START_LISTING_EDIT, listing }
}

export const cancelListingUpdate = () => {
    return { type: UPDATE_LISTING_CANCEL }
}

export const updateListing = (id, prevListing, nextListing) => dispatch => {
    const subject = { id, prevListing, nextListing };

    if (prevListing === nextListing) {
        return dispatch(cancelListingUpdate());
    }

    let data = new FormData();
    for (let prop in nextListing) {
        if (nextListing[prop] !== prevListing[prop]) {
            data.append(prop, nextListing[prop]);
        }
    }

    return dispatch({
        types: [UPDATE_LISTING_PENDING, UPDATE_LISTING_SUCCESS, UPDATE_LISTING_FAILURE],
        callAPI: () => API.updateListing(id, data),
        subject
    });
}

export const createListing = listing => {
    let data = new FormData();
    for (let prop in listing) {
        data.append(prop, listing[prop]);
    }

    return {
        types: [CREATE_LISTING_PENDING, CREATE_LISTING_SUCCESS, CREATE_LISTING_FAILURE],
        callAPI: () => API.createListing(data),
        subject: listing
    }
}
