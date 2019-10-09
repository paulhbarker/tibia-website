import {
    CREATE_ACCOUNT_FAILURE,
    CREATE_ACCOUNT_PENDING, CREATE_ACCOUNT_SUCCESS,
    SIGNUP_ADD_INFO, SIGNUP_ADD_PLAYER, SIGNUP_CANCEL, SIGNUP_CONFIRM,
    SIGNUP_DECREMENT_STEP, SIGNUP_INCREMENT_STEP
} from './types';

import { authenticate } from './authActions';
import API from '../api/accountApi';

export const completeStepOne = ({ name, email, password }) => dispatch => {
    dispatch({ type: SIGNUP_ADD_INFO, name, email, password });
    return dispatch(advance());
};

export const completeStepTwo = player => dispatch => {
    dispatch({ type: SIGNUP_ADD_PLAYER, player });
    return dispatch(advance());
};

export const completeStepThree = () => dispatch => {
    dispatch({ type: SIGNUP_CONFIRM });
    return dispatch(advance());
};

export const createAccount = values => dispatch =>{
    const accountData = {
        name: values.name,
        email: values.email,
        password: values.password,
    };

    const playerdata = values.player;

    dispatch({ type: CREATE_ACCOUNT_PENDING });

    axios.post('/api/v1/account', accountData)
        .then(res => {
            return dispatch(authenticate(accountData));
        })
        .then(() => {
            return axios.post('/api/v1/player', playerdata);
        })
        .then(res => {
            dispatch({ type: CREATE_ACCOUNT_SUCCESS });
        })
        .catch(err => {
            dispatch({ type: CREATE_ACCOUNT_FAILURE });
        });
};

export const advance = () => {
    return { type: SIGNUP_INCREMENT_STEP };
};

export const retrogress = () => {
    return { type: SIGNUP_DECREMENT_STEP };
};

export const cancelSignup = () => {
    return { type: SIGNUP_CANCEL };
};
