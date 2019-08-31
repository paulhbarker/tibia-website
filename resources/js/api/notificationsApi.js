const API = {
    getNotificationPrefs() {
        return axios.get('api/v1/notification/subscriptions');
    },

    subscribe(id, type) {
        return axios.post('api/v1/notification/subscribe', { notification_id: id, type });
    },

    unsubscribe(id, type) {
        return axios.post('api/v1/notification/unsubscribe', { notification_id: id, type });
    }
}

export default API;
