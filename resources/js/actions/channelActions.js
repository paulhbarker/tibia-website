import {
    GET_CHANNELS_FAILURE, GET_CHANNELS_PENDING, GET_CHANNELS_SUCCESS,
    ADD_CHANNEL_FAILURE, ADD_CHANNEL_PENDING, ADD_CHANNEL_SUCCESS,
    DELETE_CHANNEL_PENDING, DELETE_CHANNEL_SUCCESS, DELETE_CHANNEL_FAILURE
} from './types';
import API from '../api/channelApi';
import { channelCollection } from '../schemas/channelSchema';

export const getChannels = () => {
    return {
    	types: [GET_CHANNELS_PENDING, GET_CHANNELS_SUCCESS, GET_CHANNELS_FAILURE],
        shouldCallAPI: state => _.isEmpty(state.channels.allIds) && !state.ui.channels.loading,
        callAPI: () => API.getChannels(),
        schema: channelCollection
    }
}

export const addChannel = ({ type, value }) => {
    let method;

    switch (type) {
        case 'phone': {
            method = 'addPhoneChannel'; break;
        }

        case 'email': {
            method = 'addEmailChannel'; break;
        }
    }

    return {
        types: [ADD_CHANNEL_PENDING, ADD_CHANNEL_SUCCESS, ADD_CHANNEL_FAILURE],
        callAPI: () => API[method](value)
    }
}

export const deleteChannel = id => {
    return {
    	types: [DELETE_CHANNEL_PENDING, DELETE_CHANNEL_SUCCESS, DELETE_CHANNEL_FAILURE],
    	callAPI: () => API.deleteChannel(id),
    	subject: id
    }
}
