import * as R from 'ramda';

import {
    SET_SEARCH_PLACES_TYPE,
    SET_MY_PLACES
} from '../actionTypes';


const initialState = {
    placeType : '',
    myPlaces : []
};

export default (state = initialState, { type, payload}) => {
    switch (type) {

        case SET_SEARCH_PLACES_TYPE:
            return R.merge(state, {placeType : payload});

        case SET_MY_PLACES:
            return R.merge(state, { myPlaces : [...state.myPlaces, ...payload]})
        
        default:
            return state;
    }
    
}