<template>
  <div class="tabNav">
    <!-- TODO: 事件委托，异步ajax请求  -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">
        <div>
          <el-row>
            <el-button size="small" round>{{primaryNode}}</el-button>
          </el-row>
          <hr>
          <el-row>
            <el-button size="small" round>{{secondaryNode}}</el-button>
          </el-row>
          <hr>
        </div>
      </el-tab-pane>
  </el-tabs>
  </div>  
</template>

<script>
export default {
 data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style>
  .tabNav {
    width: 1200px;
    margin: 0 auto;
  }
  .el-tabs__active-bar {
    background-color: white;
    height: 0;
  }
</style>