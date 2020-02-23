<template>
  <div class="bd">
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card class="box-card">
      <el-table :data="rightsList" stripe border style="width: 100%">
        <el-table-column prop="id" label="#" width="60"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="等级">
          <template slot-scope="val">
            <el-tag v-if="val.row.level==='0'">一级</el-tag>
            <el-tag type="success" v-else-if="val.row.level==='1'">二级</el-tag>

            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRights } from "../../../network/home.js";
export default {
  name: "rights",
  data() {
    return {
      rightsList: [],
      tagname: ""
    };
  },
  methods: {
    getALLRights() {
      getRights("rights/" + "list")
        .then(res => {
          if (res.status != 200) {
            this.$message.error(res.data.meta.msg);
          } else {
            this.rightsList = res.data.data;
            //console.log(this.rightsList);
          }
        })
        .catch(error => {
          this.$message.success(error.data.meta.msg);
        });
    }
  },
  created() {
    this.getALLRights();
  }
};
</script>

<style lang="scss" scoped>

</style>