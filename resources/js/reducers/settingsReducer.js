import { combineReducers } from 'redux';
import { GET_PROFILE_SUCCESS, UPDATE_PROFILE_SUCCESS } from '../actions/types';

const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PROFILE_SUCCESS: {
            return action.data;
        }

        case UPDATE_PROFILE_SUCCESS: {
            return action.data;
        }

        default: {
            return state;
        }
    }
};

const settingsReducer = combineReducers({
    profile: profileReducer
});

export default settingsReducer;
