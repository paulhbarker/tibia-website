import { SubmissionError } from 'redux-form';

export const validatePassword = values => {
    return Promise.resolve().then(() => {
        if (_.isEmpty(values.password)) {
            throw new SubmissionError({ password: 'Password is required.' });
        }

        if (values.password.length < 8) {
            throw new SubmissionError({ password: 'Passwords must be at least 8 characters.' });
        }

        if (values.password_confirmation !== values.password) {
            throw new SubmissionError({ password_confirmation: 'Passwords do not match.' });
        }
    });
};
