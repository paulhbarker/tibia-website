import {
    CLEAR_CONTROLS,
    LOGIN_FAILURE, LOGIN_PENDING, LOGIN_SUCCESS,
    GET_PROFILE_FAILURE, GET_PROFILE_PENDING, GET_PROFILE_SUCCESS,
    GET_CHANNELS_FAILURE, GET_CHANNELS_PENDING, GET_CHANNELS_SUCCESS,
    UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_PENDING, UPDATE_PROFILE_SUCCESS,
    GET_NOTIF_PREFS_FAILURE, GET_NOTIF_PREFS_PENDING, GET_NOTIF_PREFS_SUCCESS,
    UPDATE_PASSWORD_FAILURE, UPDATE_PASSWORD_PENDING, UPDATE_PASSWORD_SUCCESS,
} from '../actions/types';
import { combineReducers } from 'redux';

const initialState = {
    loading: false,
    editing: null,
};

const controlsReducer = (state = { type: null }, action) => {
    switch (action.type) {
        case CLEAR_CONTROLS: {
            return { type: null };
        }

        default: {
            return state;
        }
    }
};

const notificationsUiReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTIF_PREFS_PENDING: {
            return { ...state, loading: true };
        }

        case GET_NOTIF_PREFS_SUCCESS:
        case GET_NOTIF_PREFS_FAILURE: {
            return { ...state, loading: false };
        }

        default: {
            return state;
        }
    }
};

const profileUiReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PASSWORD_PENDING:
        case UPDATE_PROFILE_PENDING:
        case GET_PROFILE_PENDING: {
            return { ...state, loading: true };
        }

        case UPDATE_PASSWORD_FAILURE:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_PROFILE_FAILURE:
        case UPDATE_PROFILE_SUCCESS:
        case GET_PROFILE_SUCCESS:
        case GET_PROFILE_FAILURE: {
            return { ...state, loading: false };
        }

        default: {
            return state;
        }
    }
};

const authUiReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_PENDING: {
            return { ...state, loading: true };
        }

        case LOGIN_FAILURE:
        case LOGIN_SUCCESS: {
            return { ...state, loading: false };
        }

        default: {
            return state;
        }
    }
};

const channelUiReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHANNELS_PENDING: {
            return { ...state, loading: true };
        }

        case GET_CHANNELS_SUCCESS:
        case GET_CHANNELS_FAILURE: {
            return { ...state, loading: false };
        }

        default: {
            return state;
        }
    }
};

const uiReducer = combineReducers({
    notifications: notificationsUiReducer,
    profile: profileUiReducer,
    controls: controlsReducer,
    auth: authUiReducer,
    channels: channelUiReducer
});

export default uiReducer;
