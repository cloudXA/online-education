<template>
  <div>
    <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      {{ title }}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="a" ref="a">单选</el-dropdown-item>
      <el-dropdown-item command="b" ref="b">多选</el-dropdown-item>
      <el-dropdown-item command="c" ref="c">判断</el-dropdown-item>
      <el-dropdown-item command="d" ref="d">简答</el-dropdown-item>
      <el-dropdown-item command="e" ref="e">面试题</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>

  </div> 
</template>

<script>
import { Dropdown } from 'element-ui';
  export default {
    name: 'DropDown',
    data() {
      return {
        title: '标题'
      }
    },
    methods: {
      handleCommand(command) {
        // TODO: 添加filter 筛选,可以参考乐淘的商品筛选
        // this.$message('click on item ' + command);
        // console.log(typeof command)
        // let key = command;
        // console.log(this.$refs);
        // console.log(this.$refs[command].$slots.default[0].text)
        this.title = this.$refs[command].$slots.default[0].text;
      }
    }
  }
</script>

<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #333333;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>