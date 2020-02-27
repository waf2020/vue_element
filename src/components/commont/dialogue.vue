<template>
  <!-- 对话框组件 -->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      
      <slot name="conent">
          <span></span>
      </slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialogue",
  props: {
    title: {
      type: String,
      default: ""
    },
    dialogVisible:{
        type:Boolean,
        default:false
    }
  },

  data() {
    return {};
  }
};
</script>