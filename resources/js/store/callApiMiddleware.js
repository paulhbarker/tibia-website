import { normalize } from 'normalizr';
import { getErrorMessage } from '../util/errorHandler';

const callApiMiddleware = ({ dispatch, getState }) => next => action => {
    const {
        types,
        callAPI,
        shouldCallAPI = () => true,
        subject = null,
        schema = null,
        ...props
    } = action;

    if (!types) {
        return next(action);
    }

    if (!Array.isArray(types) || types.length !== 3 || !types.every(type => typeof type === 'string')) {
        throw new Error('CallApiMiddleware: Expected an array of three string types.');
    }

    if (typeof callAPI !== 'function') {
        throw new Error('CallApiMiddleware: Expected callAPI to be a function.');
    }

    if (!shouldCallAPI(getState())) {
        return undefined;
    }

    const [pendingType, successType, failureType] = types;

    /**
     * Dispatch request pending action
     */
    dispatch({ ...props, type: pendingType, subject: subject });

    return callAPI()
        .then(res => {
            let data = res.data;

            if (schema) {
                data = normalize(res.data, schema);
            }

            dispatch({ ...props, type: successType, subject: subject, data });
        })
        .catch(err => {
            const error = getErrorMessage(err);

            dispatch({ ...props, type: failureType, subject: subject, error });
        });
};

export default callApiMiddleware;
