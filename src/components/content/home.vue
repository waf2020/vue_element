<template>
  <el-container class="home-container">
    
     <!-- 头部 -->
    <el-header class="home_header">
      <div class="logo">
          <img src="../../assets/logo-header.jpg">
      </div>
      <div class="user-info">
         <img src="../../assets/waf.jpg">
         <span>可乐电商管理系统管理员 colula admin</span>
      </div>

      <button @click="logout">退出</button>
      <div class="dropput">
          
      </div>
    </el-header>


    <!-- 中部 -->
    <el-container>
        <!-- 左侧菜单 -->
      <el-aside :width="iscollapse ? '64px' :'200px'" class="aside-menu">
         <el-menu 
      
      class="el-menu-vertical-demo"
      background-color="#262A33"
      text-color="#fff"
      active-text-color="#459CFF"
      :collapse='iscollapse' 
      :collapse-transition='false'
      router 
      >
      <!-- 控制折叠与收起 -->
      <div class="fold" @click="toggleCollapse">|||</div>
      <!-- 一级菜单 -->
      <el-submenu v-for="(item) in menus" :key="item.id" :index="item.path +''">
        <!-- 一级菜单的模板区域 -->
        <template slot="title">
          <i :class="icon[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item v-for="val in item.children" :key="val.id" :index="val.path+''">
          <!-- 二级菜单模板区域 -->
          <template slot="title">
           <i class="el-icon-menu"></i>
          <span>{{val.authName}}</span>
          </template>
        </el-menu-item>

        
      </el-submenu>
    </el-menu>

      </el-aside>
       <!-- 中间主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>



  </el-container>

</template>

<script>
import {getMenu} from '../../network/home.js';
export default {

  name: "home",
  data(){
  return{
    menus:[],
    icon:{
      '125':'iconfont icon-bussiness-man',
      '103':'iconfont icon-set',
      '101':'iconfont icon-Newuserzone',
      '102':'iconfont icon-manage-order',
      '145':'iconfont icon-integral'
    },
    iscollapse:false
  }
  },

  methods:{
    consoleroute(){
         console.log("点击了菜单");
    },
    logout(){
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
    //控制导航菜单折叠与收起
    toggleCollapse(){
       this.iscollapse=! this.iscollapse
    },

    
    getMenus(){
        getMenu().then(res=>{
      
       this.menus=res.data.data
       console.log(res);
       if(res.status!=200){
         let errormsg = res.data.meta.msg;
              this.$message({
                message: errormsg,
                center: true,
                type: "error"
              });
       }
    })

    }
  },
  created(){
    //获取左侧菜单列表
    this.getMenus();
  }
};
</script>

<style lang="scss" scoped>
   .home_header {
       background-color: #262A33;
       padding: 0;
       display: flex;
   }

   .aside-menu{
       background-color: #262A33;
   }

   .home-container {
       height: 100%;
   }

//    头部

.logo {
    width: 200px;
    height: 60px;
    display: flex;
    justify-content:center;
    align-items: center;
}

.logo  img {
    display: inline-block;
    text-align: center;
}

.user-info  {
    padding-left: 40px;
    display: flex;
    align-items: center;
    > img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    }

    > span {
        padding-left: 10px;
      color: #BDBEC1;
      font-size: 13.5px;
      letter-spacing:1.5px;
    }
}

.logo span {
    color: white;
    font-size: 18px;
}

.iconfont {
  padding-right: 10px;
  font-size: 23px;
}
.el-menu{
  border-right: none;
}
.fold {
  text-align: center;
  color: #909399;
  cursor:pointer;
}
</style>