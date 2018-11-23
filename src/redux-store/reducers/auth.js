import * as R from 'ramda';

import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOG_OUT
} from 'redux-store/actionTypes';

const initialState = {
    loading: false,
    user: null,
    error: null
}

export default function(state = initialState, {type, payload, error}){
    switch(type){
        case LOGIN_START:
            return R.merge(state, {loading: true})

        case LOGIN_SUCCESS:
            return R.merge(
                state, 
                {user: payload,
                loading: false,
                error: null}
            )
            
        case LOGIN_FAILURE:
            return R.merge(state, {error, loading: false})

        case LOG_OUT:
            return R.merge(state, {user: null})

        default:
            return state
    }
}