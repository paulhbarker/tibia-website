import {
    GET_KEYWORD_FAILURE,
    GET_KEYWORD_PENDING,
    GET_KEYWORD_SUCCESS,
    UPDATE_KEYWORD_FAILURE,
    UPDATE_KEYWORD_PENDING,
    UPDATE_KEYWORD_SUCCESS
} from './types';
import API from '../api/keywordApi';

export const getKeyword = () => {
    return {
        types: [GET_KEYWORD_PENDING, GET_KEYWORD_SUCCESS, GET_KEYWORD_FAILURE],
        shouldCallAPI: state => _.isEmpty(state.keyword) && !state.ui.keyword.loading,
        callAPI: () => API.getKeyword()
    }
}

export const updateKeyword = keyword => {
    return {
        types: [UPDATE_KEYWORD_PENDING, UPDATE_KEYWORD_SUCCESS, UPDATE_KEYWORD_FAILURE],
        callAPI: () => API.updateKeyword(keyword),
        subject: keyword
    }
}
