### 环境搭建
### 环境部署
- `yarn`安装环境依赖项
- `yarn dev`进入开发模式
- `yarn build`打包部署

### 功能相关
#### 1.用户提交答案
用户提交答案的id由登录时存储并在提交答案页面获取。用户点击下一题的时候，需要将用户信息本地缓存，防止用户信息丢失；当用户不小心将页面刷新时，可以通过调用回显接口。
#### 2.动态路由跳转
提醒一下，当使用路由参数时，例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。复用组件为`Summary`
#### 你可以简单地 watch (监测变化) $route 对象
```javascript
const User = {
  template: '...',
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    }
  }
}
```
#### 或者使用 2.2 中引入的 beforeRouteUpdate 导航守卫：
`@/components/summary/index.vue`
```javascript
  beforeRouteUpdate(to, from, next) {
    this.renderData(to.params.id, 2)
    next();
  },
```

#### 3. @include @mixin 等引入
`@/common/z-input/index.vue`
```scss
      $success: #586AEA;
    $warning: #ffcc00;
    $error: #cc3300;

    @mixin map-radio($color) {
        display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid $color;

            .pitch {
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: $color;
                text-align: center;
            }
    }

    .success.radio {
            @include map-radio($success)
        }
        .warning.radio {
            @include map-radio( $warning)
        }
        .error.radio {
            @include map-radio($error)
        }
```
### 项目设计思路分析
#### `main.js`:
- 该脚本
+ 1.  通过原型拓展Vue构造函数的功能：`axios`封装`./utils/request`，
+ 2. 引入vue全家桶vue-router、vuex作为new Vue()的参数，vue实例化（▶*实例化内部vue做了什么事情*）后将编译成render函数❓*将vue-router匹配的首页组件`home/index.vue`编译成render函数，然后挂载在引入的App.vue中的id为app的element中*❓。
+ 3. `import`引入`element`,Vue.use()*❓使用element-ui组件❓*, import 引入公共scss样式，import 引入`./permission.js`（▶*vue组件全局路由钩子*）*❓引入的机制和在vue内部的实现如何❓*拓展vue实例功能。
  TODO: 点击跳转到详情
### 项目中涉及到技术分析
