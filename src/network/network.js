import axios from 'axios'
export  function baseRequestGet(options,data){
   const instance= axios.create({
        baseURL:'http://127.0.0.1:8888/api/private/v1/',
        timeout:5000,
       
    })

    return instance.get(options,data);
}

export function baseRequestPost(url,data){
    const instance =axios.create({
        baseURL:'http://127.0.0.1:8888/api/private/v1/',
        timeout:5000
    })

    return instance.post(url,data)
}
