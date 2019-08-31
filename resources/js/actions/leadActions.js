import {
    CHECK_LEAD,
    UNCHECK_LEAD,
    START_LEAD_EDIT,
    CHANGE_LEAD_NOTE,
    GET_LEADS_PENDING,
    GET_LEADS_SUCCESS,
    GET_LEADS_FAILURE,
    UPDATE_LEAD_CANCEL,
    UPDATE_LEAD_SUCCESS,
    UPDATE_LEAD_PENDING,
    DELETE_LEAD_PENDING,
    DELETE_LEADS_PENDING,
    DELETE_LEAD_SUCCESS,
    DELETE_LEADS_SUCCESS,
    MARK_UNREAD_PENDING,
    MARK_UNREAD_SUCCESS,
    MARK_VIEWED_PENDING,
    MARK_VIEWED_SUCCESS,
    MARK_STARRED_PENDING,
    MARK_STARRED_SUCCESS,
    REMOVE_STAR_PENDING,
    REMOVE_STAR_SUCCESS, CLEAR_CHECKED_LEADS, CHECK_LEADS, MARK_MULTI_READ_PENDING,
    MARK_MULTI_READ_SUCCESS, DELETE_LEAD_FAILURE, DELETE_LEADS_FAILURE, UPDATE_LEAD_FAILURE, MARK_STARRED_FAILURE,
    REMOVE_STAR_FAILURE, MARK_VIEWED_FAILURE, MARK_UNREAD_FAILURE, MARK_MULTI_READ_FAILURE
} from './types';
import API from '../api/leadsApi';
import { leadCollection } from '../schemas/leadSchema';

export const getLeads = () => {
    return {
        types: [GET_LEADS_PENDING, GET_LEADS_SUCCESS, GET_LEADS_FAILURE],
        shouldCallAPI: state => _.isEmpty(state.leads.allIds) && !state.ui.leads.loading,
        callAPI: () => API.getLeads(),
        schema: leadCollection
    }
}

export const refreshLeads = () => {
    return {
        types: [GET_LEADS_PENDING, GET_LEADS_SUCCESS, GET_LEADS_FAILURE],
        callAPI: () => API.getLeads(),
        schema: leadCollection
    }
}

export const markLeadAsViewed = id => {
    return {
        types: [MARK_VIEWED_PENDING, MARK_VIEWED_SUCCESS, MARK_VIEWED_FAILURE],
        callAPI: () => API.viewLeads([ id ]),
        subject: id
    }
}

export const markLeadAsUnread = id => {
    return {
        types: [MARK_UNREAD_PENDING, MARK_UNREAD_SUCCESS, MARK_UNREAD_FAILURE],
        callAPI: () => API.unviewLeads([ id ]),
        subject: id
    }
}

export const markLeadsAsRead = ids => dispatch => {
    if (_.isEmpty(ids)) {
        return dispatch(clearCheckedLeads());
    }

    return dispatch({
        types: [MARK_MULTI_READ_PENDING, MARK_MULTI_READ_SUCCESS, MARK_MULTI_READ_FAILURE],
        callAPI: () => API.viewLeads(ids),
        subject: ids
    });
}

export const deleteLead = lead => {
    return {
        types: [DELETE_LEAD_PENDING, DELETE_LEAD_SUCCESS, DELETE_LEAD_FAILURE],
        callAPI: () => API.deleteLeads([lead.id]),
        subject: lead.id
    }
}

export const deleteLeads = ids => {
    return {
        types: [DELETE_LEADS_PENDING, DELETE_LEADS_SUCCESS, DELETE_LEADS_FAILURE],
        callAPI: () => API.deleteLeads(ids),
        subject: ids
    }
}

export const markLeadAsStarred = id => {
    return {
        types: [MARK_STARRED_PENDING, MARK_STARRED_SUCCESS, MARK_STARRED_FAILURE],
        callAPI: () => API.starLeads([ id ]),
        subject: id
    }
}

export const removeLeadStar = id => {
    return {
        types: [REMOVE_STAR_PENDING, REMOVE_STAR_SUCCESS, REMOVE_STAR_FAILURE],
        callAPI: () => API.unstarLeads([ id ]),
        subject: id
    }
}

export const updateNotes = (id, prevNotes, nextNotes) => dispatch => {
    const subject = { id, nextNotes, prevNotes };

    if (prevNotes === nextNotes || (_.isEmpty(prevNotes) && _.isEmpty(nextNotes))) {
        return dispatch({ type: UPDATE_LEAD_CANCEL, subject })
    }

    return dispatch({
        types: [UPDATE_LEAD_PENDING, UPDATE_LEAD_SUCCESS, UPDATE_LEAD_FAILURE],
        callAPI: () => API.updateNotes(id, nextNotes),
        subject
    });
}

export const checkLead = id => {
    return { type: CHECK_LEAD, id }
}

export const uncheckLead = id => {
    return { type: UNCHECK_LEAD, id }
}

export const startEditingLead = lead => {
    return { type: START_LEAD_EDIT, lead }
}

export const changeNote = (lead, notes) => {
    return { type: CHANGE_LEAD_NOTE, lead, notes }
}

export const clearCheckedLeads = () => {
    return { type: CLEAR_CHECKED_LEADS };
}

export const checkLeads = ids => {
    return { type: CHECK_LEADS, ids }
}
