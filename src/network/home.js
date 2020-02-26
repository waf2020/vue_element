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

//获取所有权限列表
export function getRights(data){
    return baseRequestGet(data)
}

//获取所有的角色列表
export function getRoles(){
    return baseRequestGet('/roles')
}

//删除角色指定权限

export function deldeteRightByRole(data){
    return baseRequestDel(data)
}

//角色授权

export function setRightByRole(url,data){
    return baseRequestPost(url,data)
}

//分配用户角色
export function assionRole(url,data){
    return baseRequestPut(url,data)
}

//获取商品分类数据列表
export function getCategory(data){
    return baseRequestGet('/categories',data);
}