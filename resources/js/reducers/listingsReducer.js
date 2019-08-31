import {
    DELETE_LISTING_FAILURE, DELETE_LISTING_PENDING,
    GET_LISTINGS_SUCCESS,
    START_LISTING_EDIT, UPDATE_LISTING_CANCEL, UPDATE_LISTING_FAILURE, UPDATE_LISTING_SUCCESS, CREATE_LISTING_SUCCESS,
    UPDATE_LISTING_PENDING, DELETE_LEAD_SUCCESS, DELETE_LEAD_FAILURE, DELETE_LEAD_PENDING, DELETE_LISTING_SUCCESS
} from '../actions/types';
import { combineReducers } from 'redux';
import { addItem, addItems, removeItem, removeItems, addKey, addKeys, removeKey, removeKeys, copy } from '../util/reducerHelpers';

function listingsById(state = {}, action) {
    switch(action.type) {
        case GET_LISTINGS_SUCCESS: {
            return action.data.entities.listings || [];
        }

        case CREATE_LISTING_SUCCESS: {
            return addKey(state, action.data.id, action.data);
        }

        case UPDATE_LISTING_PENDING: {
            const listing = state[action.subject.id];
            return { ...state, [listing.id]: action.subject.nextListing }
        }

        case UPDATE_LISTING_SUCCESS: {
            const listing = state[action.subject.id];
            return { ...state, [listing.id]: action.data }
        }

        case UPDATE_LISTING_FAILURE: {
            const listing = state[action.subject.id];
            return { ...state, [listing.id]: action.subject.prevListing }
        }

        case DELETE_LISTING_PENDING: {
            console.log(action);
            const listing = state[action.subject];
            return { ...state, [listing.id]: { ...listing, deleting: true } }
        }

        case DELETE_LISTING_FAILURE: {
            const listing = state[action.subject];
            delete listing.deleting;
            return { ...state, [listing.id]: listing }
        }

        case DELETE_LISTING_SUCCESS: {
            return removeKey(state, action.subject);
        }

        default: {
            return state;
        }
    }
}

function allListings(state = [], action) {
    switch(action.type) {
        case GET_LISTINGS_SUCCESS: {
            return action.data.result;
        }

        case CREATE_LISTING_SUCCESS: {
            return addItem(state, action.data.id);
        }

        case DELETE_LISTING_SUCCESS: {
            return removeItem(state, action.subject);
        }

        default: {
            return state;
        }
    }
}

function updatingListings(state = [], action) {
    switch(action.type) {
        case START_LISTING_EDIT: {
            return addItem(state, action.listing);
        }

        case UPDATE_LISTING_CANCEL:
        case UPDATE_LISTING_FAILURE:
        case UPDATE_LISTING_SUCCESS: {
            return [];
        }

        default: {
            return state;
        }
    }
}

const listingReducer = combineReducers({
    byId: listingsById,
    allIds: allListings,
    updating: updatingListings
});

export default listingReducer;
