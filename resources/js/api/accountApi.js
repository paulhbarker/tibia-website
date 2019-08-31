const API = {
    createAccount(data) {
        return axios.post('/api/v1/account', data);
    }
}

export default API;
