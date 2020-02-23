<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>

      <el-breadcrumb-item>用戶管理</el-breadcrumb-item>
      <el-breadcrumb-item>用戶列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片區域 -->

    <el-card class="box-card">
      <!-- 搜索框 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfos.query" clearable @clear="clearInput">
            <el-button slot="append" icon="el-icon-search" @click="queryUserInfo"></el-button>
          </el-input>
        </el-col>
        <el-col :span="16">
          <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表表格 -->
      <el-table :data="userlist" border style="width: 100%">
        <el-table-column prop="id" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>

        <el-table-column prop="mobile" label="电话"></el-table-column>

        <el-table-column prop="role_name" label="角色"></el-table-column>

        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="val">
            <!-- {{val.row.mg_state}} -->
            <el-switch
              v-model="val.row.mg_state"
              active-color="#13ce66"
              inactive-color="#EAECF0"
              @change="userStateChange(val.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="vals">
            <el-tooltip class="item" effect="dark" content="修改" placement="top">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="getUserByID(vals.row.id)"
              ></el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="deleteUser(vals.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="用户" placement="top">
              <el-button type="warning" icon="el-icon-s-tools" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页数据 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="queryInfos.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalpage"
        ></el-pagination>
      </div>
    </el-card>

    <!-- 添加用户弹出框 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="40%">
      <el-form :rules="rules" :model="userForm" status-icon ref="userForm">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="80px" prop="password">
          <el-input v-model="userForm.password" type="password"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>

        <el-form-item label="手机" label-width="80px" prop="mobile">
          <el-input v-model="userForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="adduser()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户弹出框 -->
    <el-dialog title="修改用户信息" :visible.sync="dialogUpdateVisible" width="50%">
      <el-form :rules="updateUserRules" :model="updataUserForm" status-icon ref="userUpdateFormRef">
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="updataUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input v-model="updataUserForm.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="80px" prop="mobile">
          <el-input v-model="updataUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser()">确 定</el-button>
      </span>
    </el-dialog>

    删除用户弹出框
  </div>
</template>

<script>
import {
  getUsers,
  modifyUserState,
  adduser,
  getUserInfoByID,
  updateUser,
  deleteUserById
} from "../../../network/home.js";
export default {
  name: "users",
  data() {
    return {
      userlist: [], //用户列表
      totalpage: 0, //总记录数
      dialogFormVisible: false,
      dialogUpdateVisible: false,
      //queryInfo:'' ,//搜索用户
      queryInfos: {
        //查询条件
        pagenum: 1,
        pagesize: 4,
        query: ""
      },
      userForm: {
        //新增用户表单对象
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      //修改用户临时表单对象
      updataUserForm: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [
          { required: true, message: "请输入号码", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入正确格式的手机号码",
            trigger: "blur"
          }
        ]
      },
      updateUserRules: {
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mobile: [
          {
            required: true,
            min: 11,
            max: 11,
            message: "请输入正确手机号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //修改用户
    updateUser() {
      this.$refs.userUpdateFormRef.validate(valid => {
        if (valid) {
          let temp = {
            email: this.updataUserForm.email,
            mobile: this.updataUserForm.mobile
          };
          updateUser("users/" + this.updataUserForm.id, temp)
            .then(res => {
              if (res.data.meta.status == 200) {
                this.dialogUpdateVisible = false;
                this.$message.success(res.data.meta.msg);
                this.getuser();
              }
            })
            .catch(err => {
              this.$message.error(err.data.meta.msg);
            });
        } else {
          this.dialogUpdateVisible = true;
          return false;
        }
      });
    },

    //获取用户列表
    getuser() {
      
      getUsers({params: this.queryInfos}).then(res => {
        
        //console.log("用户列表", res);
        this.userlist = res.data.data.users;
        this.totalpage = res.data.data.total;
      });
    },
    clearInput() {
      this.getuser();
    },
    //搜索用户消息
    queryUserInfo() {
      this.getuser();
    },

    //每页数据改变时触发
    handleSizeChange(val) {
      this.queryInfos.pagesize = val;
      this.getuser();
    },
    //当前页码发生改变时触发
    handleCurrentChange(val) {
      this.queryInfos.pagenum = val;
      this.getuser();
    },
    //用户状态发生改变
    userStateChange(val) {
      //console.log("发生改变",val)
      // val.id  val.mg_state
      // console.log(typeof(parseInt(val.id)));
      modifyUserState(
        "users/" + parseInt(val.id) + "/state/" + val.mg_state + ""
      ).then(res => {
        console.log(res);
        if (res.data.meta.status == 200) {
          this.$message({
            message: res.data.meta.msg,
            center: true,
            type: "success"
          });
        } else {
          val.mg_state = !val.mg_state;
          this.$message({
            message: res.data.meta.msg,
            center: true,
            type: "error"
          });
        }
      });
    },

    //添加用户
    adduser() {
      this.$refs.userForm.validate(valid => {
        //表单预验证通过
        if (valid) {
          adduser(this.userForm)
            .then(res => {
              console.log(res.data.meta.status);
              if (res.data.meta.status == 201) {
               
                this.$refs.userForm.resetFields();
                this.$message.success(res.data.meta.msg);
                this.getuser();
              } else {
                this.$message.error(res.data.meta.msg);
              }
            })
            .catch(errors => {
              console.log(errors)
              // this.$message.error(errors);
            });
          this.dialogFormVisible = false;
        } else {
          this.dialogFormVisible = true;
          return false;
        }
      });
    },

    //删除用户
    deleteUser(id) {
           console.log(id)
        this.$confirm('确认删除该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         deleteUserById("users/"+id)
        .then(res => {
          if(res.data.meta.status==200){
           
            this.$message.success(res.data.meta.msg);
            console.log(res.data.meta.msg);
             this.getuser();
             
          }else{
            this.$message.error(res.data.meta.msg);
          }
          
         
        })
        .catch(error => {
          this.$message.error(error.data.meta.msg);
        });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     
      
    },

    //根据id查找用户
    getUserByID(val) {
      console.log("val", val);

      //根据id查找用户信息
      getUserInfoByID("users/" + val).then(res => {
        if (res.data.meta.status == 200) {
          this.dialogUpdateVisible = true;
          this.updataUserForm = res.data.data;
        } else {
          this.$message.error(res.data.meta.msg);
        }
      });
    }
  },
  //确认关闭对话框吗

  created() {
    // let dataNo = {
    //   params: this.queryInfos
    // };
    this.getuser();
  }
};
</script>

<style lang="sass" scoped>

</style>
