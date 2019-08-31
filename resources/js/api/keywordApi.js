const API = {
    getKeyword() {
        return axios.get('/api/v1/keyword');
    },

    createKeyword(keyword) {
        return axios.post('/api/v1/keyword', { keyword });
    },

    updateKeyword(keyword) {
        return axios.post('/api/v1/keyword', { keyword });
    },
}

export default API;
