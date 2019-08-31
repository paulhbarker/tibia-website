import {
    CHANGE_LEAD_NOTE,
    CHECK_LEAD,
    DELETE_LEAD_FAILURE, DELETE_LEADS_FAILURE,
    DELETE_LEAD_PENDING, DELETE_LEADS_PENDING,
    GET_LEADS_SUCCESS, MARK_STARRED_FAILURE, MARK_STARRED_PENDING,
    MARK_UNREAD_FAILURE,
    MARK_UNREAD_PENDING,
    MARK_VIEWED_FAILURE,
    MARK_VIEWED_PENDING, START_LEAD_EDIT, UNCHECK_LEAD, UPDATE_LEAD_PENDING, UPDATE_LEAD_FAILURE, UPDATE_LEAD_SUCCESS,
    UPDATE_LEAD_CANCEL, REMOVE_STAR_PENDING, REMOVE_STAR_FAILURE, CLEAR_CHECKED_LEADS, CHECK_LEADS,
    MARK_MULTI_READ_PENDING, MARK_MULTI_READ_FAILURE, DELETE_LEAD_SUCCESS, DELETE_LEADS_SUCCESS
} from '../actions/types';
import { combineReducers } from 'redux';
import {
    addItem,
    addItems,
    removeItem,
    removeItems,
    addKey,
    addKeys,
    removeKey,
    removeKeys,
    copy,
    addPropToKeys, removePropFromKeys
} from '../util/reducerHelpers';

function toggleProp(state, id, prop) {
    const item = state[id];
    return { ...state, [id]: { ...item, [prop]: !item[prop]}}
}

function leadsById(state = {}, action) {
    switch(action.type) {
        case GET_LEADS_SUCCESS: {
            return action.data.entities.leads || [];
        }

        case UPDATE_LEAD_PENDING: {
            const lead = state[action.subject.id];
            return { ...state, [lead.id]: { ...lead, notes: action.subject.nextNotes } }
        }

        case UPDATE_LEAD_CANCEL:
        case UPDATE_LEAD_FAILURE: {
            const lead = state[action.subject.id];
            return { ...state, [lead.id]: { ...lead, notes: action.subject.prevNotes } }
        }

        case MARK_VIEWED_PENDING:
        case MARK_VIEWED_FAILURE:
        case MARK_UNREAD_PENDING:
        case MARK_UNREAD_FAILURE: {
            return toggleProp(state, action.subject, 'viewed');
        }

        case MARK_MULTI_READ_FAILURE:
        case MARK_MULTI_READ_PENDING: {
            const newState = copy(state);
            action.subject.forEach(id => {
                newState[id].viewed = !newState[id].viewed;
            })
            return newState;
        }

        case REMOVE_STAR_PENDING:
        case REMOVE_STAR_FAILURE:
        case MARK_STARRED_PENDING:
        case MARK_STARRED_FAILURE: {
            return toggleProp(state, action.subject, 'starred');
        }

        case DELETE_LEAD_PENDING: {
            const lead = state[action.subject];
            return { ...state, [lead.id]: { ...lead, deleting: true } }
        }

        case DELETE_LEAD_FAILURE: {
            const lead = state[action.subject];
            delete lead.deleting;
            return { ...state, [lead.id]: lead }
        }

        case DELETE_LEAD_SUCCESS: {
            return removeKey(state, action.subject);
        }

        case DELETE_LEADS_PENDING: {
            return addPropToKeys(state, action.subject, 'deleting');
        }

        case DELETE_LEADS_SUCCESS: {
            return removeKeys(state, action.subject);
        }

        case DELETE_LEADS_FAILURE: {
            removePropFromKeys(state, action.subject, 'deleting');
        }

        default: {
            return state;
        }
    }
}

function allLeads(state = [], action) {
    switch(action.type) {
        case GET_LEADS_SUCCESS: {
            return action.data.result;
        }

        case DELETE_LEAD_SUCCESS: {
            return removeItem(state, action.subject);
        }

        case DELETE_LEADS_SUCCESS: {
            return removeItems(state, action.subject);
        }

        default: {
            return state;
        }
    }
}

function checkedLeads(state = [], action) {
    switch(action.type) {
        case CHECK_LEAD: {
            return addItem(state, action.id);
        }

        case UNCHECK_LEAD: {
            return removeItem(state, action.id);
        }

        case DELETE_LEAD_PENDING: {
            return removeItem(state, action.subject);
        }

        case DELETE_LEADS_PENDING: {
            return removeItems(state, action.subject);
        }

        case CHECK_LEADS: {
            return [ ...state, ...action.ids];
        }

        case MARK_MULTI_READ_PENDING:
        case CLEAR_CHECKED_LEADS: {
            return [];
        }

        default: {
            return state;
        }
    }
}

function updatingLeads(state = {}, action) {
    switch(action.type) {
        case START_LEAD_EDIT: {
            return addKey(state, action.lead.id, action.lead);
        }

        case UPDATE_LEAD_CANCEL:
        case UPDATE_LEAD_PENDING:
        case UPDATE_LEAD_FAILURE:
        case UPDATE_LEAD_SUCCESS: {
            return removeKey(state, action.subject.id);
        }

        case CHANGE_LEAD_NOTE: {
            return { ...state, [action.lead.id]: { ...action.lead, notes: action.notes } }
        }

        default: {
            return state;
        }
    }
}

const leadReducer = combineReducers({
    byId: leadsById,
    allIds: allLeads,
    checked: checkedLeads,
    updating: updatingLeads
});

export default leadReducer;
