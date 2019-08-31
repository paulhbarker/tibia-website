import { REFRESH_TOKEN_FAILURE, REFRESH_TOKEN_PENDING, REFRESH_TOKEN_SUCCESS } from '../actions/types';

export const saveToken = token => {
    token.expires_at = new Date().getTime() + (token.expires_in * 1000)

    localStorage.setItem('rf_token', JSON.stringify(token));

    return token;
}

export const deleteToken = () => {
    localStorage.removeItem('rf_token');
}

export const setAuthHeader = token => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export const refreshIfNecessary = (state, dispatch) => {
    const threshold = 5 * 60 * 1000; // 5 minute window

    return new Promise(resolve => {
        if (!state.auth.token) {
            return resolve();
        }

        if (state.auth.token.expires_at > new Date().getTime() + threshold) {
            setAuthHeader(state.auth.token.access_token);
            return resolve();
        }

        dispatch({ type: REFRESH_TOKEN_PENDING });

        axios.post('/api/v1/login/refresh', { refresh_token: state.auth.token.refresh_token })
            .then(res => {
                const token = saveToken(res.data);

                setAuthHeader(token.access_token);

                dispatch({ type: REFRESH_TOKEN_SUCCESS, token });
                resolve();
            })
            .catch(() => {
                deleteToken();

                dispatch({ type: REFRESH_TOKEN_FAILURE });
                resolve();
            })
    })
}
