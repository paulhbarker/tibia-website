export const validateKeyword = values => {
    if ( !values.name.match(/^[a-zA-Z0-9]{4,12}$/) ) {
        return Promise.reject({ _error: 'Keyword is invalid.' });
    }
    return axios.get('/api/v1/availability/keyword', { params: { keyword: values.name }})
        .then(res => {
            if (res.data !== true) {
                throw { _error: 'Keyword is unavailable.' };
            }
        })
        .catch(err => {
            if (err._error.includes('unavailable')) throw err;
            throw { _error: 'An error occurred while validating the keyword.' };
        });
}
