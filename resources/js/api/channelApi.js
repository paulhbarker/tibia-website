const API = {
    getChannels() {
        return axios.get('/api/v1/channels');
    },

    addEmailChannel(email) {
        return axios.post('/api/v1/email', { email })
    },

    addPhoneChannel(phone) {
        return axios.post('/api/v1/phone', { phone })
    },

    deleteChannel(id) {
        return axios.delete(`/api/v1/channel/${id}`);
    }
}

export default API;
