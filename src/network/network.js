import axios from 'axios'
export  function baseRequest(options){
   const instance= axios.create({
        baseURL:'http://127.0.0.1:8888/api/private/v1/',
        timeout:5000
    })

    return instance(options);
}
