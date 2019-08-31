import {
    GET_INVOICES_PENDING, GET_INVOICES_SUCCESS, GET_INVOICES_FAILURE,
    UPDATE_CARD_PENDING, UPDATE_CARD_SUCCESS, UPDATE_CARD_FAILURE
} from './types';
import API from '../api/billingApi';

export const getInvoices = () => {
    return {
    	types: [GET_INVOICES_PENDING, GET_INVOICES_SUCCESS, GET_INVOICES_FAILURE],
    	callAPI: () => API.getInvoices()
    }
}

export const updateCard = stripeToken => {
    return {
    	types: [UPDATE_CARD_PENDING, UPDATE_CARD_SUCCESS, UPDATE_CARD_FAILURE],
    	callAPI: () => API.updateCard(stripeToken)
    }
}
