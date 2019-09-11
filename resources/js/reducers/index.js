import uiReducer from './uiReducer';
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import modalReducer from './modalReducer';
import signupReducer from './signupReducer';
import channelReducer from './channelReducer';
import settingsReducer from './settingsReducer';
import passwordReducer from './passwordReducer';
import { reducer as formReducer } from 'redux-form';
import paginationReducer from './paginationReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    form: formReducer,
    modal: modalReducer,
    signup: signupReducer,
    channels: channelReducer,
    settings: settingsReducer,
    password: passwordReducer,
    pagination: paginationReducer,
    notifications: notificationReducer
});

export default rootReducer;
