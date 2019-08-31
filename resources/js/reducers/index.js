import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import uiReducer from './uiReducer';
import leadsReducer from './leadsReducer';
import listingsReducer from './listingsReducer';
import paginationReducer from './paginationReducer';
import modalReducer from './modalReducer';
import settingsReducer from './settingsReducer';
import authReducer from './authReducer';
import keywordReducer from './keywordReducer';
import signupReducer from './signupReducer';
import passwordReducer from './passwordReducer';
import billingReducer from './billingReducer';
import channelReducer from './channelReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    leads: leadsReducer,
    keyword: keywordReducer,
    listings: listingsReducer,
    pagination: paginationReducer,
    ui: uiReducer,
    modal: modalReducer,
    form: formReducer,
    settings: settingsReducer,
    signup: signupReducer,
    password: passwordReducer,
    billing: billingReducer,
    channels: channelReducer,
    notifications: notificationReducer
});

export default rootReducer;
