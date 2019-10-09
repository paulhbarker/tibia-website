import {
    LOGOUT,
    LOGIN_FAILURE,
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_PENDING,
    RESET_PASSWORD_SUCCESS
} from './types';
import R from '../constants';
import API from '../api/authApi';
import { saveToken, deleteToken, setAuthHeader } from '../util/tokenHelpers';

export const authenticate = ({ name, password }) => dispatch => {
    dispatch({ type: LOGIN_PENDING });

    return axios.post('/api/v1/login', { name, password })
        .then(res => {
            const token = saveToken(res.data.token);

            setAuthHeader(token);

            dispatch({ type: LOGIN_SUCCESS, token });
        })
        .catch(err => {
            let error;

            if (err.response && err.response.status === 401) {
                error = 'Authentication failed!';
            } else {
                console.log(err);
                error = R.string.ERROR_LOGIN;
            }

            dispatch({ type: LOGIN_FAILURE, error });
        });
};

export const recoverPassword = email => {
    return {
        types: [RESET_PASSWORD_PENDING, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE],
        callAPI: () => API.passwordRecovery(email)
    };
};

export const setPassword = values => dispatch => {
    const data = {
        token: values.token,
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation
    };

    dispatch({ type: RESET_PASSWORD_PENDING });

    return API.setPassword(data)
        .then(() => {
            dispatch({ type: RESET_PASSWORD_SUCCESS });
        })
        .catch(err => {
            let error;

            if (err.response && err.response.status === 401) {
                error = 'The link for this password reset has expired.';
            } else {
                console.log(err);
                error = R.string.ERROR_PASSWORD;
            }

            dispatch({ type: RESET_PASSWORD_FAILURE, error });
        });

    return {
        types: [RESET_PASSWORD_PENDING, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE],
        callAPI: () => API.setPassword(data)
    };
};

export const logout = () => {
    deleteToken();

    return { type: LOGOUT };
};
