import {
    CREATE_ACCOUNT_FAILURE, CREATE_ACCOUNT_PENDING,
    CREATE_ACCOUNT_SUCCESS,
    SIGNUP_ADD_BILLING,
    SIGNUP_ADD_COUPON,
    SIGNUP_ADD_INFO,
    SIGNUP_CANCEL, SIGNUP_DECREMENT_STEP,
    SIGNUP_INCREMENT_STEP
} from '../actions/types';

const initialState = {
    step: 1,
    email: null,
    password: null,
    stripeToken: null,
    coupon: null,
    loading: false,
    error: null
}

const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_INCREMENT_STEP: {
            return { ...state, step: state.step + 1 }
        }

        case SIGNUP_DECREMENT_STEP: {
            return { ...state, step: state.step - 1 }
        }

        case SIGNUP_ADD_INFO: {
            return { ...state, email: action.email, password: action.password };
        }

        case SIGNUP_ADD_COUPON: {
            return { ...state, coupon: action.coupon };
        }

        case SIGNUP_ADD_BILLING: {
            return { ...state, stripeToken: action.stripeToken };
        }

        case CREATE_ACCOUNT_PENDING: {
            return { ...state, loading: true }
        }

        case CREATE_ACCOUNT_SUCCESS: {
            return initialState;
        }

        case CREATE_ACCOUNT_FAILURE: {
            return { ...state, error: action.error, loading: false, step: 3 }
        }

        case SIGNUP_CANCEL: {
            return initialState;
        }

        default:
            return state;
    }
};

export default signupReducer;
