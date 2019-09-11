import API from '../api/profileApi';
import {
    GET_PROFILE_PENDING,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    REMOVE_AVATAR_PENDING,
    REMOVE_AVATAR_SUCCESS,
    REMOVE_AVATAR_FAILURE, UPDATE_PROFILE_PENDING, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE, ADD_AVATAR_PENDING,
    ADD_AVATAR_SUCCESS, ADD_AVATAR_FAILURE, UPDATE_PASSWORD_PENDING, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE,
} from './types';

export const getProfile = () => {
    return {
        types: [GET_PROFILE_PENDING, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE],
        shouldCallAPI: state => _.isEmpty(state.settings.profile) && !state.ui.profile.loading,
        callAPI: () => API.getProfile(),
    };
};

export const removeAvatar = () => {
    return {
        types: [REMOVE_AVATAR_PENDING, REMOVE_AVATAR_SUCCESS, REMOVE_AVATAR_FAILURE],
        callAPI: () => API.removeAvatar()
    };
};

export const addAvatar = file => {
    const data = new FormData();
    data.append('photo', file);

    return {
        types: [ADD_AVATAR_PENDING, ADD_AVATAR_SUCCESS, ADD_AVATAR_FAILURE],
        callAPI: () => API.addAvatar(data)
    };
};

export const updateProfile = (prevProfile, nextProfile) => {
    const data = new FormData();
    for (const prop in nextProfile) {
        if (nextProfile[prop] !== prevProfile[prop]) {
            data.append(prop, nextProfile[prop]);
        }
    }

    return {
        types: [UPDATE_PROFILE_PENDING, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE],
        callAPI: () => API.updateProfile(data)
    };
};

export const updatePassword = values => {
    console.log(values);
    return {
        types: [UPDATE_PASSWORD_PENDING, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE],
        callAPI: () => API.updatePassword(values)
    };
};
