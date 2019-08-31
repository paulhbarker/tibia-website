import { SubmissionError } from 'redux-form'

const validateLogin = values => {
    return Promise.resolve().then(() => {
        if (_.isEmpty(values.email)) {
            throw new SubmissionError({ email: 'Email is required.'});
        }

        if (_.isEmpty(values.password)) {
            throw new SubmissionError({ password: 'Password is required.'});
        }
    })
}

export default validateLogin;
