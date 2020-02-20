import {baseRequestPost,baseRequestGet,baseRequestPut,baseRequestDel} from './network.js'

//登录
export function register(data){
    return baseRequestPost('/login',data)
}

//获取左侧菜单
export function getMenu(){
    return baseRequestGet('/menus')
}



export function testquery(data){
    return baseRequestGet('/users',data)
}

//获取用户列表
export function getUsers(data){
  
    return baseRequestGet('/users',data);
}

//修改用户状态
export function modifyUserState(data){
    return baseRequestPut(data)
}

//搜索用户消息
export function queryUserInfo(data){
    return baseRequestGet(data);
}

//新加用户
export function adduser(data){
    return baseRequestPost('users',data)
}

//根据id查找用户信息
export function getUserInfoByID(data){
    return baseRequestGet(data)
}

//修改用户信息
export function updateUser(url,data) { 
    return baseRequestPut(url,data);
 }
 //ById删除用户
export function deleteUserById(data){
     return baseRequestDel(data);
}