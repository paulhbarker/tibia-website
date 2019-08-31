const API = {
    getListings() {
        return axios.get('api/v1/listings');
    },

    createListing(data) {
        return axios.post('/api/v1/listing', data);
    },

    updateListing(id, data) {
        return axios.post(`/api/v1/listing/${id}`, data);
    },

    deleteListing(id) {
        return axios.delete(`/api/v1/listing/${id}`);
    }
}

export default API;
