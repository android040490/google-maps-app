import axios from 'axios';

export function authentication(email, password){
    return axios({
        method: 'post',
        url: '/api/login',
        data: {
           email,
           password 
        }
    })
}

export function getAuth(token){
    return axios({
        method: 'get',
        url: '/api/auth',
        headers: {'Authorization': `Bearer ${token}`}
    })
}

export function postMarkers(markers){
    return axios({
        method: 'post',
        url: '/api/places',
        data: {
            markers
        }
    })
}

export function getMarkers(){
    return axios({
        method: 'get',
        url: '/api/places'
    })
}