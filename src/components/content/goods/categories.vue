<template>
    <div>
        <el-card>
            <el-button type="primary">添加分类</el-button>
            <!-- 树状表格区域 -->
            ZkTable
            <zk-table
             :data="categoryList"
             :columns="columns"
             :selection-type="props.selectionType"
              :expand-type="props.expandType"
              show-index
              index-text="#"
             border
             :show-row-hover="props.showRowHover"
            >
            <template slot-scope="scope" slot="isok">
               <i>第一个i  {{scope.row.cat_delated}}</i>
                 <i v-if="scope.row.cat_delated===true" class="el-icon-success" ></i>
                 <i v-else >-----{{scope.row.cat_delated}}</i>
                 <a> {{scope.row.cat_delated}}</a>
            </template>
            </zk-table>
        </el-card>

    </div>

</template>

<script>
import {getCategory} from '../../../network/home'
export default {
    name:'categories',
    data(){
        return {
           queryInfo:{  //获取分类查询条件
              type:'3',
              pagenum:'0',
              pagesize:5
           },
           categoryList:[],
            props: {
          stripe: false, //是否显示纹
          border: false, //是否显示纵向边框
          showHeader: true,//是否显示表头
          showSummary: false,//显示表尾合计行？
          showRowHover: true,//鼠标悬停时是否显示高亮
          showIndex: false,//是否显示数据索引
          treeType: true, //是否为树形表格
          isFold: true,  //父级是否默认折叠
          expandType: false,//是否为展开行类型表格
          selectionType: false,//是否为多选类型表格
        },
           columns:[
               {
                   label:'分类名称',
                   prop:'cat_name'

               },
               {
                   label:'是否有效',
                   //prop:'cat_deleted',
                  type:'template',
                  template:'isok'

               },
               {
                   label:'排序',
                   prop:'cat_level'

               },
           ]
        }
    },
    methods:{
     getAllCategory(){
         getCategory({params:this.queryInfo}).then(res=>{
             if(res.data.meta.status===200){
                   this.categoryList=res.data.data.result;
                   //console.log(Array.isArray(this.categoryList));
                   console.log(res.data.data.result);
             }
            
         })

     }
    },
    components:{

    },
    created(){
   this.getAllCategory();
    }
}
</script>

<style lang="scss" scoped>

</style>