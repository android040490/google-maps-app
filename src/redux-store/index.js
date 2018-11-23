import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';

import history from '../history';

const enhancer = applyMiddleware( routerMiddleware(history) ,thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(enhancer));

export default store;