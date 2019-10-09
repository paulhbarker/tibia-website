import {
    LOGOUT,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('auth_token'),
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return { ...state, token: action.token, error: null };
        }

        case LOGIN_FAILURE: {
            return { ...state, token: null, error: action.error };
        }

        case LOGOUT: {
            return { ...state, token: null, error: null };
        }

        default:
            return state;
    }
};

export default authReducer;
