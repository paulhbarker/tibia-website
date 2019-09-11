const API = {
    getProfile() {
        return axios.get('/api/v1/user');
    },

    updateProfile(data) {
        return axios.post('/api/v1/user', data);
    },

    updatePassword(data) {
        return axios.post('/api/v1/password/update', data);
    }
};

export default API;
