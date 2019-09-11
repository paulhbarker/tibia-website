import { combineReducers } from 'redux';
import { SET_PAGINATION, SET_VISIBLE } from '../actions/types';

const initialState = {
    currentPage: 1,
    totalPages: 1,
    perPage: 40,
};

const paginationReducerFor = prefix => {
    const paginationReducer = (state = initialState, action) => {
        switch (action.type) {
            case prefix + SET_PAGINATION: {
                const { currentPage, totalPages } = action.payload;
                return { ...state, currentPage, totalPages };
            }

            case prefix + SET_VISIBLE: {
                return { ...state, onPage: action.payload };
            }

            default: {
                return state;
            }
        }
    };

    return paginationReducer;
};

const paginationReducer = combineReducers({
    leads: paginationReducerFor('LEADS_'),
    listings: paginationReducerFor('LISTINGS_'),
});

export default paginationReducer;
