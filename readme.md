### 环境搭建
### 环境部署
- `yarn`安装环境依赖项
- `yarn dev`进入开发模式
- `yarn build`打包部署

### 功能相关
#### 1.用户提交答案
用户提交答案的id由登录时存储并在提交答案页面获取。用户点击下一题的时候，需要将用户信息本地缓存，防止用户信息丢失；当用户不小心将页面刷新时，可以通过调用回显接口。
#### 2.动态路由跳转
提醒一下，当使用路由参数时，例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。
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
