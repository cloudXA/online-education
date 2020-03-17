<template>
  <div class="container">
    <Title :url="imageSrc" v-slot:title>{{name}}</Title>
    <el-row>
      <!-- <el-col :span="8" >    -->
        <el-card v-for="(item, index) in items" :key="index" shadow="hover" class="card-container">
          <div  class="container">
            <img src="./image/试卷.png" alt="试卷" width="80" height="80">
            <div class="titleContainer">
              <span class="paragraph">{{item.title}}</span>
              <div class="subscript">
                <span><img src="./image/题库.png" alt="题库" width="26" height="17">共{{item.number}}题</span>
                <span><img src="./image/browser.png" alt="浏览" width="20" height="14">共{{item.watch}}题</span>
              
              </div>
            </div>
              <!-- TODO: 点击进入相关的页面 -->
            <el-button type="primary" plain class="popButton">立即前往</el-button>
          </div>
        </el-card>
      <!-- </el-col> -->
    </el-row>
  </div>
</template>

<script>
  import Title from '@/common/title.vue'

  export default {
    data() {
      return {
        name: '面试题区',
        title: '',
        number: 0,
        watcher: 0,
        items: '',
        imageSrc: {
          src: "/src/assets/interview.png"
        }
      }
    },
    components: {
      Title
    },
    methods: {
      async getCompanyTest() {
        const { data: res } = await this.$http.get('/api/getCompanyTest');
        console.log(res,'res');
        this.items = res.data;
        console.log(this.items)
      } 
    },
    mounted() {
      this.getCompanyTest();
    }
  }
</script>

<style lang="scss" scoped>
    .container {
      text-align: center;
      
    }
    .card-container:hover {
      .paragraph {
        color: #586AEA;
      }
      .popButton {
        display: block;
        margin: 0 auto;
        margin-top: 25px;
      }
    }
    .card-container {
      display: inline-block;
        .container {
        width: 360px;
        height: 160px;
        .titleContainer {
          margin-left: 15px;
          .paragraph {
            display: inline-block;
            text-align: left;
            width: 260px;
            height: 50px;
          }
          .subscript {
            text-align: left;
            img {
              vertical-align: middle;
              margin-right: 10px;
            }
            span {
              vertical-align: baseline;
            }
          }
          display: inline-block;
          vertical-align: top;
          box-sizing: border-box;
        }
      }
    }
    .popButton {
      // margin-top: 25px;
      display: none;
      // text-align: center;
    }
  
    
  
</style>