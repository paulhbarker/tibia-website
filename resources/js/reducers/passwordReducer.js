import {
    RESET_PASSWORD_PENDING,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    UPDATE_PASSWORD_PENDING, UPDATE_PASSWORD_FAILURE, UPDATE_PASSWORD_SUCCESS
} from '../actions/types';

const initialState = {
    error: null,
    isResetting: false,
    success: null
}

const passwordReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PASSWORD_PENDING:
        case RESET_PASSWORD_PENDING: {
            return { isResetting: true, success: null, error: null }
        }

        case UPDATE_PASSWORD_SUCCESS:
        case RESET_PASSWORD_SUCCESS: {
            return { isResetting: false, success: true, error: null };
        }

        case UPDATE_PASSWORD_FAILURE:
        case RESET_PASSWORD_FAILURE: {
            return { isResetting: false, error: action.error, success: false };
        }

        default:
            return state;
    }
};

export default passwordReducer;
