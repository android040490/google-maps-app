
import {
    SET_SEARCH_PLACES_TYPE,
    SET_MY_PLACES,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOG_OUT
} from 'redux-store/actionTypes';
import * as API from 'API';

export const setSearchType = (placeType) => dispatch => {
    dispatch({type : SET_SEARCH_PLACES_TYPE, payload : placeType})
}

export const setMyPlaces = (markers) => dispatch => {
    API.postMarkers(markers)
        .then(res => {
            dispatch({type : SET_MY_PLACES , payload : res.data})
        })
        .catch(err => console.log(err))
}

export const login = (email, password) => dispatch => {
    dispatch({type: LOGIN_START})

    API.authentication(email, password)
        .then(resp => {
            API.getAuth(resp.data.token)
                .then(resp => {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: resp.data.user
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            
            dispatch({
                type : LOGIN_FAILURE,
                error : err.response
            })
        })
}

export const logOut = () => (dispatch) => {
    dispatch({
        type: LOG_OUT
    })
}

