const API = {
    getInvoices() {
        return axios.get('/api/v1/subscription/invoices');
    },

    updateCard(stripeToken) {
        return axios.post('/api/v1/subscription/paymentType', { stripeToken });
    }
}

export default API;
