<template>
  <div>
    <div class="demo-input-size">
      <!-- TODO:   搜索框 无法将icon绑定click事件-->
      <el-input
        @keyup.enter.native="searchContent"
        size="medium"
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
        v-model="input2">
      </el-input>

      <div class="dropDown">
        <drop-down />
      </div>
    </div> 
  </div>
</template>

<script>
import DropDown from './dropdown.vue'

export default {
  components: {
    DropDown
  },
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: ''
    }
  },
  methods: {
    searchContent() {
      console.log('hi')
    }
  }
  
}
</script>

<style>
  .demo-input-size {
    display: inline-block;
    width: 300px;
    position: relative;
  }
  .dropDown {
    position: absolute;
    z-index: 999;
    /* border: 1px solid black; */
    left: 5px;
    top: 6px;
    padding-right: 10px;
    border-right: 1px solid gray;
  }
  .el-input__inner {
    padding: 5px 75px;
  }
</style>