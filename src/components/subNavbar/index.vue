<template>
  <div class="tabNav">
      <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">
        <div>
          <el-row>
            <!-- <el-button size="small" round>{{primaryNode}}</el-button> -->
            <x-button>{{primaryNode}}</x-button>

          </el-row>
          <hr>
          <el-row>
            <!-- <el-button size="small" round>{{secondaryNode}}</el-button> -->
            <x-button>{{secondaryNode}}</x-button>
          </el-row>
          <hr>
        </div>
      </el-tab-pane>
  </el-tabs>
  </div>  
</template>

<script>
import XButton from '../../common/button/index.vue'

export default {
  components: {
    XButton
  },

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