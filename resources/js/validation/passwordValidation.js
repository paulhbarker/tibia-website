import { SubmissionError } from 'redux-form';

const validatePassword = values => {
    return Promise.resolve().then(() => {
        if (_.isEmpty(values.password_current)) {
            throw new SubmissionError({ password_current: 'Current password is required.' });
        }

        if (_.isEmpty(values.password)) {
            throw new SubmissionError({ password: 'New password is required.' });
        }

        if (values.password && values.password.length < 8) {
            throw new SubmissionError({ password: 'Password must be at least 8 characters.' });
        }

        if (_.isEmpty(values.password_confirmation)) {
            throw new SubmissionError({ password_confirmation: 'New password confirmation is required.' });
        }

        if (values.password_confirmation !== values.password) {
            throw new SubmissionError({ password_confirmation: 'Passwords do not match.' });
        }
    });
};

export default validatePassword;
