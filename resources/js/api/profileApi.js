const API = {
    getProfile() {
        return axios.get('/api/v1/user');
    },

    updateProfile(data) {
        return axios.post('/api/v1/user', data)
    },

    updatePassword(data) {
        return axios.post('/api/v1/password/update', data)
    },

    addAvatar(data) {
        return axios.post('/api/v1/user/photo', data);
    },

    removeAvatar() {
        return axios.delete('/api/v1/user/photo');
    }
}

export default API;
