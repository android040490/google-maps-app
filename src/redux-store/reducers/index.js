import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as form} from 'redux-form';

import places from './places';
import auth from './auth';

export default combineReducers({
    routing: routerReducer,
    places,
    auth,
    form    
});
