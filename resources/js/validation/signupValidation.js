import { SubmissionError } from 'redux-form'

export const validateInfo = values => {
    const errors = {}

    if ( !values.email ) {
        errors.email = 'Email is required';
    }

    if ( !values.password ) {
        errors.password = 'Password is required';
    }

    if ( values.email && !values.email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/) ) {
        errors.email = 'Please provide a valid email';
    }

    if ( values.password && values.password.length < 8 ) {
        errors.password = 'Password must be at least 8 characters';
    }

    return errors;
}

export const validateEmail = values => {
    return axios.get('/api/v1/availability/email', { params: { email: values.email }})
        .then(res => {
            if (res.data !== true) {
                throw new SubmissionError({ email: 'Email is already in use.' });
            }
        })
        .catch(err => {
            if (err instanceof SubmissionError) throw err;
            throw new SubmissionError({ _error: 'An error occurred while validating your email.' });
        });
}

export const validateCoupon = values => {
    return axios.get('/api/v1/coupon', { params: { code: values.coupon }})
        .then(res => {
            return res.data;
        })
}
