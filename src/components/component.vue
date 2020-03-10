<template>
  <div>
    <!-- 注册引用 -->
    <Menu 
      :menus="menus" 
      :web-site="webSite"
      @addMenu="addMenu"
    />
  </div>
</template>

<script>
import Menu from '@/views/index.vue';
import PubSub from 'pubsub-js';

export default {
  name: 'Dpp',
  components: {
    Menu //映射组件标签
  },
  data() {
    return {
      menus: [
        {
          id: 1,
          name: '科技'
        },
        {
          id: 2,
          name: '文化'
        },
        {
          id: 3,
          name: '政治'
        },
        {
          id: 4,
          name: '娱乐'
        }
      ],
      webSite: {
        url: 'http://www.baidu.com',
        title: '百度'
      }
    };
  },
  mounted() {
    console.log('mounted');
    // 订阅消息，相当于前面的绑定事件监听 
    PubSub.subscribe('add',(msg,data) => {
      console.log(msg);
      this.addMenu(data);
    });
  },
  methods: {
    addMenu(menu) {
      this.menus.push(menu);
    },
  }
};
</script>

<style>

</style>