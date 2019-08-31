import { combineReducers } from 'redux';
import {
    GET_PROFILE_SUCCESS, REMOVE_AVATAR_SUCCESS, UPDATE_PROFILE_SUCCESS, ADD_AVATAR_SUCCESS
} from '../actions/types';

const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PROFILE_SUCCESS: {
            return action.data;
        }

        case REMOVE_AVATAR_SUCCESS: {
            return { ...state, photo: null }
        }

        case ADD_AVATAR_SUCCESS: {
            return { ...state, photo: action.data.photo }
        }

        case UPDATE_PROFILE_SUCCESS: {
            return action.data;
        }

        default: {
            return state;
        }
    }
}

const settingsReducer = combineReducers({
    profile: profileReducer
})

export default settingsReducer;
