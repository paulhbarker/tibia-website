import { SubmissionError } from 'redux-form';

const validateListing = values => {
    return Promise.resolve().then(() => {
        if (_.isEmpty(values.address)) {
            throw new SubmissionError({ address: 'Address is required.' });
        }
    });
};

export default validateListing;
