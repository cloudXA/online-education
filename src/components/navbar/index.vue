<template>
  <div class="container">
    <div class="navbar">
      <el-row class="inner">
        <el-col :span="4" class="love">
          <div class="logContainer grid-content">
            <span>爱题网</span>
          </div>
        </el-col>
        <el-col :span="10" class="tabContent">
            <router-link to="home-page" class="homepage">首页</router-link>
            <router-link to="knowledge" class="knowledge">题库</router-link>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <search-bar></search-bar>
          </div>
        </el-col>
        <el-col :span="4" class="easy">
          <div class="grid-content ">
            <router-link to="login" class="login">登录</router-link>
            <router-link to="register" class="register">
              <el-button round>注册</el-button>
            </router-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <router-view></router-view>
  </div>
  
  
</template>

<script>
import SearchBar from './search/index.vue'

export default {
  components: {
    SearchBar
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

<style lang="scss" scoped>
  .easy {
    text-align: right;
    .login {
      text-decoration: none;
    }
    .register {
      width: 56px;
      height: 24px;
    }
  }
  .inner {
    width: 1200px;
    margin: 0 auto;
    padding-top: 10px;
  }
  .tabContent {
    padding-top: 10px;
    .homepage, .knowledge {
      text-decoration: none;
      margin-right: 70px;
      padding-bottom: 28px;
      
    }
    .router-link-active {
      border-bottom: 2px solid #586AEA;
      color: #586AEA;
    }
    
  }
  .navbar {
    width: 100%;
    height: 70px;
    margin: 0 auto;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .logContainer {
    color: #586AEA;
    font-size: 32px;
  }
</style>