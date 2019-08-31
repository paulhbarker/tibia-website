import { SHOW_MODAL, HIDE_MODAL, CLEAR_MODAL, START_CLOSE_MODAL, SET_MODAL } from '../actions/types';

const initialState = {
    isVisible: false,
    type: 'default',
    data: {}
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MODAL: {
            return { ...state, data: action.data, type: action.modalType }
        }

        case SHOW_MODAL: {
            return { ...state, isVisible: true};
        }

        case HIDE_MODAL: {
            return { ...state, isVisible: false };
        }

        case CLEAR_MODAL: {
            return initialState;
        }

        default:
            return state;
    }
};

export default modalReducer;
