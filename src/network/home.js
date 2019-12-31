import {baseRequest} from './network.js'


export function register(){
    return baseRequest('/login')
}