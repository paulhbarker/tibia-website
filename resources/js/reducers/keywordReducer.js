import { GET_KEYWORD_FAILURE, GET_KEYWORD_SUCCESS } from '../actions/types';

const keywordReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_KEYWORD_SUCCESS: {
            return action.data;
        }

        case GET_KEYWORD_FAILURE: {
            return {};
        }

        default: {
            return state;
        }
    }
}

export default keywordReducer;
