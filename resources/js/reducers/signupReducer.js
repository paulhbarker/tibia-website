
import {
    SIGNUP_CANCEL,
    SIGNUP_ADD_INFO,
    SIGNUP_ADD_PLAYER,
    SIGNUP_INCREMENT_STEP,
    SIGNUP_DECREMENT_STEP,
    CREATE_ACCOUNT_PENDING,
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_FAILURE,
} from '../actions/types';

const initialState = {
    step: 1,
    name: null,
    email: null,
    password: null,
    player: {},
    loading: false,
    error: null
};

const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_INCREMENT_STEP: {
            return { ...state, step: state.step + 1 };
        }

        case SIGNUP_DECREMENT_STEP: {
            return { ...state, step: state.step - 1 };
        }

        case SIGNUP_ADD_INFO: {
            return { ...state, name: action.name, email: action.email, password: action.password };
        }

        case SIGNUP_ADD_PLAYER: {
            return { ...state, player: action.player };
        }

        case CREATE_ACCOUNT_PENDING: {
            return { ...state, loading: true };
        }

        case CREATE_ACCOUNT_SUCCESS: {
            return initialState;
        }

        case CREATE_ACCOUNT_FAILURE: {
            return { ...state, error: action.error, loading: false, step: 3 };
        }

        case SIGNUP_CANCEL: {
            return initialState;
        }

        default:
            return state;
    }
};

export default signupReducer;
