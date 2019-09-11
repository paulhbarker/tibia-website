import { SubmissionError } from 'redux-form';

export const validateEmail = values => {
    return axios.get('/api/v1/availability/email', { params: { email: values.email } })
        .then(res => {
            if (res.data !== false) {
                throw new SubmissionError({ email: 'No account exists for this email.' });
            }
        })
        .catch(err => {
            if (err instanceof SubmissionError) throw err;
            throw new SubmissionError({ _error: 'An error occurred while validating your email.' });
        });
};
