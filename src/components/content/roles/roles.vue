<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-button type="primary" round>添加角色</el-button>
      <el-table :data="rolesList" stripe border style="width: 100%">
        <el-table-column width="60" type="expand">
          <template slot-scope="val">
          <!--   -->
            <el-row type="flex"  align="middle" :class="['bd-bottom',i===0? 'bdtop':'']" v-for="(item1,i) in val.row.children" :key="item1.id">
              <!-- 渲染一级权限 -->
              <el-col :span="7">
                <el-tag closable  @close="handleClose(val.row,item1.id)"> {{item1.authName}} </el-tag>
                <i class="el-icon-caret-right"></i>
                  
              </el-col>
              <!-- 渲染二级和三级 -->
              <el-col :span="16">
               <el-row type="flex"  align="middle" v-for="(item2,i2) in item1.children" :key="item2.id" :class="i2==0? '':'bdtop'">
                 <el-col :span="10">
                   <el-tag closable type="success"  @close="handleClose(val.row,item2.id)">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                 </el-col>
                 <el-col :span="14">
                   <el-row >
                     <el-col :span="24"><el-tag  @close="handleClose(val.row,item3.id)" closable type="warning"  v-for="(item3) in item2.children" :key="item3.id" >{{item3.authName}}</el-tag></el-col>
                   </el-row>
                 </el-col>
                
               </el-row>

              </el-col>
            </el-row>

            <!-- <pre>{{val.row.children[1].authName}}</pre>  -->
          </template>
        </el-table-column>
        <el-table-column prop="id" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="val">
            <el-button type="primary" icon="el-icon-edit" size="small">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
            <el-button type="warning" icon="el-icon-s-tools" size="small" @click="setRights(val.row)">分配</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 弹出分配权限对话框 -->
    <el-dialog
  title="分配权限"
  :visible.sync="dialogRightVisible"
  width="50%"
  >
  <!-- 权限树
  show-checkbox：节点是否可被选
  default-expand-all:默认展开所有节点
  default-checked-keys：默认勾选的节点的 key 的数组
   -->
 <el-tree
  :data="rightsList"
  :props="defaultprops"
  show-checkbox
  default-expand-all
  node-key="id"
  :default-checked-keys="defaultcheckedkeys"
  ref="tree"
 >
</el-tree>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogRightVisible = false">取 消</el-button>
    <el-button type="primary" @click="updataRightByRole">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import { getRoles,deldeteRightByRole,getRights,setRightByRole} from "../../../network/home";
export default {
  name: "roles",
  data() {
    return {
      rolesList: [],
      rightsList:[],
      dialogRightVisible:false,
      defaultprops:{
         label: 'authName',
          children: 'children'
      },
      defaultcheckedkeys:[116], //默认选中节点的key值
      roleId:''
    };
  },
  methods: {
    getAllroles() {
      getRoles().then(res => {
        this.rolesList = res.data.data;
      });
    },

    updataRightByRole(){
      const atrKeys=[
        ...this.$refs.tree.getCheckedKeys(),
        ...this.$refs.tree.getHalfCheckedKeys()
      ]
 const idstr=atrKeys.join(',');
 setRightByRole('roles/'+this.roleId+'/rights',{rids:idstr}).then(res=>{
   console.log(res);
   if(res.data.meta.status!=200){
     this.$message.error('更新权限失败')
   }else{
     this.$message.success(res.data.meta.msg)
   }
   this.dialogRightVisible=false;

 })
      // console.log('idstr:'+typeof(idstr));
      //  console.log(this.$refs.tree.getCheckedKeys())
      //   console.log(this.$refs.tree.getHalfCheckedKeys())
    },
//找到被选中的三级权限的id数组
getNodeIdByThirdRight(node,arr){
  if(!node.children){
    //console.log('arr'+arr);
    //console.log(Array.isArray(arr))
    return arr.push(node.id)
  }
  node.children.forEach(item=>{
    this.getNodeIdByThirdRight(item,arr);
  })
},
//获取所有权限列表
getAllRights(){
 getRights("rights/"+"tree").then(res=>{
    if (res.data.meta.status != 200) {
            this.$message.error(res.data.meta.msg);
          } else {
            this.rightsList = res.data.data;
            console.log(this.rightsList);
          }
 })
},
//分配权限
    setRights(valrow){
      this.dialogRightVisible=true;
     // console.log(valrow)
     this.roleId=valrow.id;

      this.getNodeIdByThirdRight(valrow,this.defaultcheckedkeys);
       
    },

    
 //删除角色指定权限
      handleClose(val,rightID) {
      let roleId=val.id;
      //console.log('roleId:'+roleId);
     // console.log('roleId:'+rightID);
      deldeteRightByRole("roles/"+roleId+"/rights/"+rightID).then(res=>{
        if(res.data.meta.status===200){
            this.$message.success(res.data.meta.msg);
            val.children=res.data.data
        }
      })
      
    }

  },
  created() {
    this.getAllroles();
    this.getAllRights(); //获取所有权限列表
  }
};
</script>

<style lang="scss" scoped>
    .bd-bottom {
      border-bottom:1px solid #EEEFEE;
    }

    .bdtop{
      border-top:1px solid #EEEFEE;
    }
    .el-tag {
     margin: 7px;
    }
</style>