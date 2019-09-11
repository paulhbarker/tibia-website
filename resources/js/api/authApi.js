const API = {
    login(email, password) {
        return axios.post('/api/v1/login', { email, password });
    },

    passwordRecovery(email) {
        return axios.post('/api/v1/password/recovery', { email });
    },

    setPassword(data) {
        return axios.post('/api/v1/password/set', data);
    }
};

export default API;
