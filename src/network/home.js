import {baseRequestPost,baseRequestGet} from './network.js'


export function register(data){
    return baseRequestPost('/login',data)
}

export function testquery(data){
    return baseRequestGet('/users',data)
}