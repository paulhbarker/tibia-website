import { SubmissionError } from 'redux-form';

export const validateInfo = values => {
    const errors = {};

    if ( !values.name ) {
        errors.name = 'Account name is required';
    }

    if ( !values.email ) {
        errors.email = 'Email is required';
    }

    if ( !values.password ) {
        errors.password = 'Password is required';
    }

    if ( values.name && (values.name.length < 5 || values.name.length > 32)) {
        errors.name = 'Please provide a valid account name';
    }

    if ( values.email && !values.email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/) ) {
        errors.email = 'Please provide a valid email';
    }

    if ( values.password && values.password.length < 8 ) {
        errors.password = 'Password must be at least 8 characters';
    }

    return errors;
};

export const validatePlayer = values => {
    const errors = {};

    if ( !values.name ) {
        errors.name = 'Player name is required';
    }

    if ( values.name && (values.name.length < 5 || values.name.length > 32) ) {
        errors.name = 'Provide a valid player name';
    }

    if ( !values.vocation ) {
        errors.vocation = 'Vocation is required';
    }

    if ( !values.sex ) {
        errors.sex = 'Gender is required';
    }

    if ( !values.town ) {
        errors.town = 'Town is required';
    }

    return errors;
};

export const ensureUniqueness = values => {
    const requests = [
        axios.get('/api/v1/availability/email', { params: { email: values.email } }),
        axios.get('/api/v1/availability/name', { params: { name: values.name } }),
    ];

    return Promise.all(requests)
        .then(([emailResponse, nameResponse]) => {
            if (emailResponse.data !== true) {
                throw new SubmissionError({ email: 'Email is already in use.' });
            }

            if (nameResponse.data !== true) {
                throw new SubmissionError({ name: 'Account name is already in use.' });
            }
        })
        .catch(err => {
            if (err instanceof SubmissionError) throw err;
            throw new SubmissionError({ _error: 'An error occurred during validation.' });
        });
};

export const validatePlayerName = values => {
    return axios.get('/api/v1/availability/player', { params: { player: values.name } })
        .then(res => {
            if (res.data !== true) {
                throw new SubmissionError({ email: 'Player name is already in use.' });
            }
        })
        .catch(err => {
            if (err instanceof SubmissionError) throw err;
            throw new SubmissionError({ _error: 'An error occurred during validation.' });
        });
};
