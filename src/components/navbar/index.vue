<template>
  <div class="container">
    <div class="content">
      <ul>
        <li>
          <ul class="logo-container">
            <li class="logo">爱题网</li>
            <li>
              <ul @click="handleToggle($event)">
                <li :class="{condition: true, active: isActive }"   name="homepage">
                  首页
                </li>
                <li></li>
                <li :class="{condition: true, active: !isActive }" name="knowledge">
                  题库
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li></li>
        <li>
          <ul class="search-container">
            <li>
              <search-bar></search-bar>
            </li>
            <li>  </li>
            <li>
              <ul>
                <li class="login">登录</li>
                <li class="sign">注册</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>  
</template>

<script>
import SearchBar from './components/index';


export default {
  name: 'NavBar',
  components: {
    SearchBar
  },
  data() {
    return {
      isActive: true
    }
  },
  methods: {
    handleToggle(event) {
        let navigate = event.target.getAttribute('name');
        this.$router.push({ name: navigate });
        this.isActive = !this.isActive; 

    }
  }
}
</script>

<style scoped lang="scss">
  .container {
    height: 70px;
    background: #FFFFFF;
    box-shadow: 6px 0px 12px 0px rgba(0, 0, 0, 0.1);

    .content {
      width: 1200px;
      margin: 0 auto;



      & > ul {
        display: grid;
        grid-template-columns: 305px 370px 493px;
        grid-template-rows: 70px;
        // line-height: 70px;
        justify-items: center;
        align-items: center;
      }

      .logo-container {
        display: grid;
        grid-template-columns: 200px 134px;

        .logo {
          width: 96px;
          height: 70px;
          line-height: 70px;
          font-size: 32px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #586AEA;

        }

        .condition {
          width: 32px;
          height: 70px;
          font-size: 16px;
          line-height: 70px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #505050;
          cursor: pointer;
        }

        .active {
          width: 32px;
          height: 70px;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #586AEA;
          border-bottom: 2px solid #586AEA;
        }

        & ul {
          display: grid;
          grid-template-columns: 40px 40px 70px;
        }
      }

      .search-container {
        display: grid;
        grid-template-columns: 320px 30px 90px;
        align-items: center;
        cursor: pointer;
        
        .login {
          width: 24px;
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #505050;
          align-items: center;


        }
        .sign {
          width: 56px;
          height: 24px;
          border-radius: 12px;
          border: 1px solid #586AEA;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #586AEA;
          text-align: center;
          line-height: 22px;
        }
        & ul {
          display: grid;
          grid-template-columns: 34px 56px;
          align-items: center;
        }
      }
    }
    
    
  }
</style>