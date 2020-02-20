import axios from 'axios'


//get请求
export  function baseRequestGet(options,data){
   const instance= axios.create({
        baseURL:'http://127.0.0.1:8888/api/private/v1/',
        timeout:5000,
       
    })
//请求拦截器
    instance.interceptors.request.use(config=>{
        config.headers.Authorization=window.sessionStorage.getItem('token');
        return config
      })

    return instance.get(options,data);
}

//post请求
export function baseRequestPost(url,data){
    const instance =axios.create({
        baseURL:'http://127.0.0.1:8888/api/private/v1/',
        timeout:5000
    })

    instance.interceptors.request.use(config=>{
       
       
        config.headers.Authorization=window.sessionStorage.getItem('token');
        
        return config
      })

    return instance.post(url,data)
}

//put请求
export function baseRequestPut(url,data){
    const instance =axios.create({
        baseURL:'http://127.0.0.1:8888/api/private/v1/',
        timeout:5000
    })

    instance.interceptors.request.use(config=>{
       
      
        config.headers.Authorization=window.sessionStorage.getItem('token');
      
        return config
      })

    return instance.put(url,data)
}

//delete请求
export function baseRequestDel(url,data){
    const instance =axios.create({
        baseURL:'http://127.0.0.1:8888/api/private/v1/',
        timeout:5000
    })

    instance.interceptors.request.use(config=>{
       
      
        config.headers.Authorization=window.sessionStorage.getItem('token');
      
        return config
      })

    return instance.delete(url,data)
}
