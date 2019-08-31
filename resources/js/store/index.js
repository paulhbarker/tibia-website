import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import callApiMiddleware from './callApiMiddleware';

const middlewares = process.env.NODE_ENV === 'production'
    ? [ thunk, callApiMiddleware ]
    : [ thunk, callApiMiddleware ];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(...middlewares)
))

// const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
// const store = createStoreWithMiddleware(rootReducer);

export default store;
