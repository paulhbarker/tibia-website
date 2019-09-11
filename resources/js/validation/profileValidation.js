import { SubmissionError } from 'redux-form';

const profileValidation = values => {
    return Promise.resolve().then(() => {
        if (values.first_name && _.isEmpty(values.first_name)) {
            throw new SubmissionError({ first_name: 'First Name is required.' });
        }
    });
};

export default profileValidation;
