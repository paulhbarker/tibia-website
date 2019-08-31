import { SubmissionError } from 'redux-form'

export const asyncValidate = values => {
    return Promise.resolve();
    return axios.get('/api/v1/availability/coupon', { params: { coupon: values.coupon }})
        .then(res => {
            if (res.data !== true) {
                throw new SubmissionError({ coupon: 'Invalid coupon.' });
            }
        })
        .catch(err => {
            if (err instanceof SubmissionError) throw err;
            throw new SubmissionError({ _error: 'An error occurred while validating your coupon.' });
        });
}
