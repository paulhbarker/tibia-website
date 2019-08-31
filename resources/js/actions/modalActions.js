import { SHOW_MODAL, HIDE_MODAL, CLEAR_MODAL, SET_MODAL } from './types';

export const setModal = (modalType, data) => {
    return { type: SET_MODAL, modalType, data }
}

export const hideModal = () => dispatch => {
    dispatch({ type: HIDE_MODAL });
}

export const showModal = modal => {
    return { type: SHOW_MODAL, modal }
}

export const clearModal = () => {
    return { type: CLEAR_MODAL };
}
