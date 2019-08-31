import {
    GET_NOTIF_PREFS_SUCCESS,
    NOTIF_SUBSCRIBE_FAILURE,
    NOTIF_SUBSCRIBE_PENDING, NOTIF_UNSUBSCRIBE_FAILURE,
    NOTIF_UNSUBSCRIBE_PENDING,
} from '../actions/types';
import { combineReducers } from 'redux';

function toggleProp(state, id, prop) {
    const item = state[id];
    return { ...state, [id]: { ...item, [prop]: !item[prop]}}
}

function notificationsById(state = {}, action) {
    switch (action.type) {
        case GET_NOTIF_PREFS_SUCCESS: {
            return action.data.entities.notifications || [];
        }

        case NOTIF_UNSUBSCRIBE_PENDING:
        case NOTIF_UNSUBSCRIBE_FAILURE:
        case NOTIF_SUBSCRIBE_FAILURE:
        case NOTIF_SUBSCRIBE_PENDING: {
            return toggleProp(state, action.subject.id, action.subject.type);
        }

        default: {
            return state;
        }
    }
};

function allNotifications(state = [], action) {
    switch(action.type) {
        case GET_NOTIF_PREFS_SUCCESS: {
            return action.data.result;
        }

        default: {
            return state;
        }
    }
}

const notificationReducer = combineReducers({
    byId: notificationsById,
    allIds: allNotifications,
});

export default notificationReducer;
