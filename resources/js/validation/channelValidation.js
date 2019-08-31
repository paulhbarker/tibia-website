import { SubmissionError } from 'redux-form';

export const validatePhone = phone => {
    return Promise.resolve().then(() => {
        if (_.isEmpty(phone)) {
            throw new SubmissionError({ value: 'Phone is required.'});
        }

        if (!/^([0-1]([\s-.])?)?(\(?[2-9]\d{2}\)?|[2-9]\d{3})([\s-.])?(\d{3}([\s-.])?\d{4})$/.test(phone)) {
            throw new SubmissionError({ value: 'Invalid phone number.'});
        }
    });
}

export const validateEmail = email => {
    return Promise.resolve().then(() => {
        if (_.isEmpty(email)) {
            throw new SubmissionError({ value: 'Email is required.'});
        }

        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
            throw new SubmissionError({ value: 'Invalid email.'});
        }
    });
}
