export const saveToken = token => {
    token.expires_at = new Date().getTime() + (token.expires_in * 1000);

    localStorage.setItem('auth_token', JSON.stringify(token));

    return token;
};

export const deleteToken = () => {
    localStorage.removeItem('auth_token');
};

export const setAuthHeader = token => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};
