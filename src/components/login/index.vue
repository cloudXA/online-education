<template>
  <div class="cont clearfix" :style="{height: height}" ref="app">
    <div class="container clearfix"
      v-loading='loading'
      element-loading-background="rgba(0, 0, 1, 0.18)"
    >
      <p class="formTitle">登录</p>

      <el-form 
        ref="form" 
        :model="form" 
        label-width="80px" 
        label-position="top" 
        :rules="rules"
        status-icon
      >
        <el-form-item 
          label="账号：" 
          prop="email"
          
        >
          <el-input 
            v-model="form.email" 
            placeholder="请输入账号"
            autocomplete="off"
          >
          </el-input>

        </el-form-item>

        <el-form-item 
          label="密码："
          prop="password"
        > 
          <el-input 
            :type="passwordType"
            v-model="form.password" 
            placeholder="请输入密码"
            autocomplete="off"
          >
          </el-input>

          <span class="show-pwd" @click.stop="showPwd">
            <i class="iconfont icon-eye" :class="passwordType === 'password' ? 'icon-eye1' : 'icon-eye'" ></i>
          </span>
        </el-form-item>


        <p class="forgetPassword">忘记密码</p>
        <el-form-item size="large" class="submitContainer">
          <x-button @click.native="onSubmit('form')">登录</x-button>
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

     <a href="https://beian.miit.gov.cn/" target="_blank" class="beian">
                        备案号: 皖ICP备2021008954号-1                    
                    </a>
  </div>
</template>

<script>
import XButton from '../../common/button/index.vue'


export default {
  components: {
    XButton
  },
  data() {
    let validatePass = (rule, value, callback) => {
      let regular = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!regular.test(value)) {
        callback(new Error('密码必须是数字字母组合&长度咋8-16位'));
      } else {
        callback();
      }
    };

    let validateEmail = (rule, value, callback) => {
      let regular = /\S+@\S+\.\S+/;
      if(value === "") {
        callback(new Error('邮箱不能为空'))
      } else if(value !== "" && !regular.test(value)) {
        callback(new Error('邮箱格式不正确'))
      }else {
        callback();
      }
      
    }


    return {
      height: '',
      width: '',
      passwordType: "password",
      loading: false,
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          {
            validator: validateEmail, trigger: ['blur','change']
          }
        ],
        password: [
          {
            validator: validatePass, trigger: ['blur','change']
          }
        ],
      }

    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        
        if(valid) {
          this.loading = true;
          this.$store.dispatch('user/login_vuex', this.form)
            .then((data) => {
              this.loading = false;
              this.$router.push({name: 'home'})
            })
            .catch((err) => {
              this.loading = false;
              this.$message({
                message: '密码或用户名不存在',
                type: 'error'
              })
            })
        } else {
          return false;
        }
      })
    },

    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
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
    margin-top: 40px;
    z-index: 10;
    border: 1px solid blueviolet;
    padding: 40px 82px 37px 78px;
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #979797;

    .submitContainer {
      text-align: center;
    }

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

    .show-pwd {
      position: absolute;
      top: 2px;
      right: 30px;
    }
  }

  .beian {
    text-decoration: none;
    color: #ffff;
    position: fixed;
    bottom: 10px;
    
  }
</style>

<style lang="scss" scoped>
  .container > .el-form {
    .el-form-item__label {
      line-height: 20px;
    }

  }
</style>