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
      <div class="dropput">
          
      </div>
    </el-header>


    <!-- 中部 -->
    <el-container>
        <!-- 左侧菜单 -->
      <el-aside width="200px" class="aside-menu">
         <el-menu
      
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- 一级菜单 -->
      <el-submenu index="1">
        <!-- 一级菜单的模板区域 -->
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item>
          <!-- 二级菜单模板区域 -->
          <template slot="title">
           <i class="el-icon-location"></i>
          <span>分组一</span>
          </template>
        </el-menu-item>

        <el-menu-item>
          <template slot="title">
           <i class="el-icon-location"></i>
          <span>分组二</span>
          </template>
        </el-menu-item>
        
      </el-submenu>
  
     
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>

      </el-aside>
       <!-- 中间主体 -->
      <el-main>Main</el-main>
    </el-container>



  </el-container>

</template>

<script>
export default {
  name: "home"
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
</style>