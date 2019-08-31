const API = {
    getLeads() {
        return axios.get('/api/v1/leads');
    },

    updateNotes(id, notes) {
        return axios.post(`/api/v1/lead/${id}/notes`, { notes });
    },

    deleteLeads(ids) {
        return axios.delete(`/api/v1/leads`, { params: { leads: ids } });
    },

    unviewLeads(ids) {
        return axios.post(`/api/v1/leads/unview`, { leads: ids });
    },

    viewLeads(ids) {
        return axios.post(`/api/v1/leads/view`, { leads: ids });
    },

    unstarLeads(ids) {
        return axios.post(`/api/v1/leads/unstar`, { leads: ids });
    },

    starLeads(ids) {
        return axios.post(`/api/v1/leads/star`, { leads: ids });
    },
}

export default API;
