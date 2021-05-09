<template>
  <div class="cont clearfix" :style="{height: height}" ref="app">
    <p class="title">爱题网</p>
    <div class="container clearfix">
      <p class="formTitle">登录</p>
      <el-form ref="form" :model="form" label-width="80px" label-position="top">
        <el-form-item label="账号：">
          <el-input v-model="form.email" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码："> 
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="验证码：">
          <el-input v-model="form.vertification" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <p class="forgetPassword">忘记密码</p>
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
        <p class="registerCon">没有账户，<a href="#/sign" class="register">去注册</a></p>
        <ul>
          <li>
            <span class="loginQQ"></span>
            <span>QQ登录</span>
          </li>
          <li>
            <span class="loginwechat"></span>
            <span>微信登录</span>
          </li>
        </ul>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
        vertification: ''
      },
      height: '',
      width: ''
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if(valid) {
          this.$store.dispatch('user/login_vuex', this.form)
            .then((data) => {
              this.$router.push({name: 'home'})
            })
        }
      })
    }
  },
  mounted() {
    // 获取浏览器宽高   
    // this.height = document.documentElement.clientHeight
    this.$refs.app.style.height = document.documentElement.clientHeight + 'px'

    this.height = document.documentElement.clientHeight
    this.width = document.documentElement.clientWidth
  },
}
</script>

<style lang="scss" scoped>
  .cont {
    height:auto; 
    overflow:hidden;
    background-image: url("../../image/bg.png");
    background-position: 0 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: block;

    .title {
      width: 96px;
      height: 45px;
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 45px;
      margin: 32px 0 0 320px;
    }
  }
  .container {
    z-index: 10;
    border: 1px solid blueviolet;
    width: 520px;
    height: 600px;  //加上之后使得width超出1920px  
    position: absolute;
    left: 720px;
    top: 32px;
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

    & ul {
      display: flex;
      padding-left: 77px;
      padding-top: 21px;
      li {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #8E95AC;
        line-height: 14px;

      }

      li:nth-child(2) {
        padding-left: 150px;
      }

      .loginQQ {
        display: inline-block;
        background-image: url("../../image/qq.png");
        background-repeat: no-repeat;
        background-position: 0 0;
        width: 30px;
        height: 30px;
        margin-bottom: 10px;
      }

      .loginwechat {
        background-position: center;
        display: inline-block;
        background-image: url("../../image/微信.png");
        background-repeat: no-repeat;
        width: 30px;
        height: 30px;
        margin-bottom: 10px;
      }


    }
  }
</style>

<style lang="scss">
  .container > .el-form {
    .el-form-item__label {
      line-height: 20px;
    }

    .el-button {
      width: 100%;
    }

    .el-button--primary {
      background-color: #586AEA;
      border-color: #586AEA;
    }

    .el-input__inner {
      padding: 0 15px; 
    }
  }
</style>