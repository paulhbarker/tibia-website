import {
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT, REFRESH_TOKEN_PENDING, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILURE, CREATE_ACCOUNT_SUCCESS
} from '../actions/types';

const initialState = {
    token: JSON.parse(localStorage.getItem('rf_token')),
    error: null,
    refreshing: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REFRESH_TOKEN_SUCCESS:
        case LOGIN_SUCCESS: {
            return { ...state, token: action.token, error: null, refreshing: false }
        }

        case CREATE_ACCOUNT_SUCCESS: {
            return { ...state, token: action.data, error: null }
        }

        case LOGIN_FAILURE: {
            return { ...state, token: null, error: action.error };
        }

        case REFRESH_TOKEN_FAILURE:
        case LOGOUT: {
            return { ...state, token: null, error: null };
        }

        case REFRESH_TOKEN_PENDING: {
            return { ...state, refreshing: true }
        }

        default:
            return state;
    }
};

export default authReducer;
