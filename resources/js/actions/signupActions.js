import {
    CREATE_ACCOUNT_FAILURE,
    CREATE_ACCOUNT_PENDING, CREATE_ACCOUNT_SUCCESS,
    SIGNUP_ADD_BILLING, SIGNUP_ADD_COUPON, SIGNUP_ADD_INFO, SIGNUP_CANCEL,
    SIGNUP_DECREMENT_STEP, SIGNUP_INCREMENT_STEP
} from './types';
import API from '../api/accountApi';

export const completeStepOne = ({ email, password }) => dispatch => {
    dispatch({ type: SIGNUP_ADD_INFO, email, password })
    return dispatch(advance());
}

export const completeStepTwo = ({ coupon }) => dispatch => {
    dispatch({ type: SIGNUP_ADD_COUPON, coupon })
    return dispatch(advance());
}

export const completeStepThree = ({ stripeToken }) => dispatch => {
    dispatch({ type: SIGNUP_ADD_BILLING, stripeToken });
    return dispatch(advance());
}

export const createAccount = values => {
    const data = {
        email: values.email,
        password: values.password,
        stripeToken: values.stripeToken.id
    }

    if (values.coupon) {
        data.coupon = values.coupon.code;
    }

    return {
        types: [CREATE_ACCOUNT_PENDING, CREATE_ACCOUNT_SUCCESS, CREATE_ACCOUNT_FAILURE],
        callAPI: () => API.createAccount(data)
    }
}

export const advance = () => {
    return { type: SIGNUP_INCREMENT_STEP };
}

export const retrogress = () => {
    return { type: SIGNUP_DECREMENT_STEP };
}

export const cancelSignup = () => {
    return { type: SIGNUP_CANCEL };
}
