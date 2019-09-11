import {
    GET_CHANNELS_SUCCESS,
    ADD_CHANNEL_SUCCESS,
    DELETE_CHANNEL_SUCCESS,
    DELETE_CHANNEL_PENDING,
    DELETE_CHANNEL_FAILURE,
} from '../actions/types';
import { combineReducers } from 'redux';
import { addItem, addKey, removeItem, removeKey } from '../util/reducerHelpers';

function channelsById(state = {}, action) {
    switch (action.type) {
        case GET_CHANNELS_SUCCESS: {
            return action.data.entities.channels || [];
        }

        case ADD_CHANNEL_SUCCESS: {
            return addKey(state, action.data.id, action.data);
        }

        case DELETE_CHANNEL_PENDING: {
            const channel = state[action.subject];
            return { ...state, [channel.id]: { ...channel, deleting: true } };
        }

        case DELETE_CHANNEL_FAILURE: {
            const channel = state[action.subject];
            delete channel.deleting;
            return { ...state, [channel.id]: channel };
        }

        case DELETE_CHANNEL_SUCCESS: {
            return removeKey(state, action.subject);
        }

        default: {
            return state;
        }
    }
}

function allChannels(state = [], action) {
    switch (action.type) {
        case GET_CHANNELS_SUCCESS: {
            return action.data.result;
        }

        case ADD_CHANNEL_SUCCESS: {
            return addItem(state, action.data.id);
        }

        case DELETE_CHANNEL_SUCCESS: {
            return removeItem(state, action.subject);
        }

        default: {
            return state;
        }
    }
}

const channelReducer = combineReducers({
    byId: channelsById,
    allIds: allChannels,
});

export default channelReducer;
