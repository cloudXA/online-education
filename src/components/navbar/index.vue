<template>
  <div class="container">
    <div class="content">
      <ul>
        <li>
          <ul class="logo-container">
            <li class="logo">爱题网</li>
            <li>
              <ul>
                <router-link :to="{name: 'homepage'}" tag="li" class="condition" name="homepage">
                  首页
                </router-link>
                <li></li>
                <router-link :to="{name: 'knowledge'}" tag="li" class="condition" name="knowledge">
                  题库
                </router-link>
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
            <li></li>
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

  </div>  

</template>

<script>
import SearchBar from './components/search';

export default {
  name: 'NavBar',
  components: {
    SearchBar
  },
  data() {
    return {
      isActive: true,
      isHomepage: true
    }
  },
  methods: {
    
    
  }
}
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 70px;
    background: #FFFFFF;
    box-shadow: 6px 0px 12px 0px rgba(0, 0, 0, 0.1);

    .content {
      padding: 0 30px;
      & > ul {
        display: grid;
        grid-template-columns: 2fr 1fr 2fr;
        grid-template-rows: 70px;
        justify-items: center;
        align-items: center;
        
      }

      .logo-container {
        display: grid;
        grid-template-columns: 200px 134px;

        .logo {
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

        .router-link-active {
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

    .router-content {
      background: #F8F8F8;
      padding-top: 20px;
    }
    .is-homepage {
      padding-top: 0px;
    }
    
    
  }
</style>