import {
    GET_INVOICES_PENDING, GET_INVOICES_FAILURE, GET_INVOICES_SUCCESS,
    UPDATE_CARD_FAILURE, UPDATE_CARD_PENDING, UPDATE_CARD_SUCCESS
} from '../actions/types';

const initialState = {
    invoices: [],
    error: null
}

const billingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INVOICES_SUCCESS: {
            return { ...state, invoices: action.data }
        }

        case UPDATE_CARD_PENDING: {
            return { ...state, error: null }
        }

        case UPDATE_CARD_SUCCESS: {
            return { ...state, error: null }
        }

        case UPDATE_CARD_FAILURE: {
            return { ...state, error: action.error }
        }

        default:
            return state;
    }
};

export default billingReducer;
