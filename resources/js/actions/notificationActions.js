import API from '../api/notificationsApi';
import {
    GET_NOTIF_PREFS_PENDING, GET_NOTIF_PREFS_SUCCESS, GET_NOTIF_PREFS_FAILURE,
    NOTIF_SUBSCRIBE_PENDING, NOTIF_SUBSCRIBE_SUCCESS, NOTIF_SUBSCRIBE_FAILURE,
    NOTIF_UNSUBSCRIBE_PENDING, NOTIF_UNSUBSCRIBE_SUCCESS, NOTIF_UNSUBSCRIBE_FAILURE
} from './types';
import { notificationCollection } from '../schemas/notificationSchema';

export const getNotificationPrefs = () => {
    return {
    	types: [GET_NOTIF_PREFS_PENDING, GET_NOTIF_PREFS_SUCCESS, GET_NOTIF_PREFS_FAILURE],
        shouldCallAPI: state => _.isEmpty(state.notifications.allIds) && !state.ui.notifications.loading,
        callAPI: () => API.getNotificationPrefs(),
        schema: notificationCollection
    }
}

export const subscribe = (id, type) => {
    return {
    	types: [NOTIF_SUBSCRIBE_PENDING, NOTIF_SUBSCRIBE_SUCCESS, NOTIF_SUBSCRIBE_FAILURE],
    	callAPI: () => API.subscribe(id, type),
    	subject: { id, type }
    }
}

export const unsubscribe = (id, type) => {
    return {
        types: [NOTIF_UNSUBSCRIBE_PENDING, NOTIF_UNSUBSCRIBE_SUCCESS, NOTIF_UNSUBSCRIBE_FAILURE],
        callAPI: () => API.unsubscribe(id, type),
        subject: { id, type }
    }
}
