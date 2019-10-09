export const saveToken = token => {
    localStorage.setItem('auth_token', token);

    return token;
};

export const deleteToken = () => {
    localStorage.removeItem('auth_token');
};

export const setAuthHeader = token => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};
