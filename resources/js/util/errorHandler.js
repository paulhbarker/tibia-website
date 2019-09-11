export const getErrorMessage = err => {
    if (err.response) {
        if (_.get(err, 'response.data.message', null)) {
            return err.response.data.message;
        }

        if (_.get(err, 'response.data.error.message', null)) {
            return err.response.data.error.message;
        }
    } else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js

        return err.request;
    } else {
        // Something happened in setting up the request that triggered an Error

        return err.message;
    }
};
