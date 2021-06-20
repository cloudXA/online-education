<template>
  <div class="cont clearfix" :style="{'height': height}" ref="app">
    <p class="title">爱题网</p>
    <div class="container clearfix">
      <p class="formTitle">注册</p>
      <el-form ref="form" :model="form" label-width="80px" label-position="top">
        <el-form-item label="邮箱：">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码："> 
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item size="large" class="signButton">
          <x-button @click.native="onSubmit" type="input">注册</x-button>

        </el-form-item>
      </el-form>
    </div>
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
      form: {
        email: '',
        password: '',
      },
      height: ''
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if(valid) {
          this.$store.dispatch('user/sign_vuex', this.form)
            .then((data) => {
              this.$router.push({name: 'login'})
            })
        }
      })
    }
  },
  mounted() {
    // 获取浏览器宽高 
    this.height = document.documentElement.clientHeight
    this.$refs.app.style.height = document.documentElement.clientHeight + 'px'

   
  },
}
</script>

<style lang="scss" scoped>
  .cont {
    height:auto; 
    overflow:hidden;
    background-color: #586AEA;
    background-position: 0 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    flex-direction: column;

    .title {
      width: 96px;
      height: 45px;
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 45px;
      margin: 30px 0;

    }
  }
  .container {
    z-index: 10;
    border: 1px solid blueviolet;
    width: 520px;
    height: 400px;  //加上之后使得width超出1920px  
    padding: 40px 82px 37px 78px;
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #979797;


    & > .formTitle {
      text-align: center;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #586AEA;
      line-height: 18px;

    } 

    & > .formFrame {
      .input {
        display: block;
      }
    }

    &  .forgetPassword {
      cursor: pointer;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 14px;
      text-align: right;
      margin: -7px 0 21px 0;
    }

    & .registerCon {
      text-align: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 14px;
      & .register {
        color: #5E70EB;

      }
    }

    & .signButton {
      margin-top: 50px;
      text-align: center;
    } 
  

  }
</style>

<style lang="scss" scoped>
  .container > .el-form {
    .el-form-item__label {
      line-height: 20px;
    }

    // .el-button {
    //   width: 100%;
    // }

    // .el-button--primary {
    //   background-color: #586AEA;
    //   border-color: #586AEA;
    // }

    // .el-input__inner {
    //   padding: 0 15px; 
    // }
  }
</style>