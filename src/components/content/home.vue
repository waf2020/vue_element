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
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
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