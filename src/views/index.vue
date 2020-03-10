<template>
  <div>
    <a :href="webSite.url" target="_blank" :title="webSite.title">
      <img src="@/assets/logo.png" alt="logo">
    </a>
    <ul>
      <li v-for= "(item, index) in menus" :key="index">{{ item.name }} {{ item.id }}</li>
    </ul>
    <input type="text" v-model="content">
    <button @click="add">添加</button>
    <!-- 直接传递一个标签，通过slot插槽实现 -->
    <!-- 作用：某一个区块，先占位，然后可以动态的搞个标签进去，方便切换该位置的内容，
    无需再搞多个页面 -->
    <Foo>
      <b slot="f">
        版权所有{{ site }}
      </b>
    </Foo>
  </div>
</template>

<script>
import PubSub from 'pubsub-js';
import Foo from '../components/foo';

export default {
  // 子组件，将接收来自父组件通过属性传递而来的值 
  name: 'Components',
  // 声明接收属性,这个属性就会成为组件对象的属性 
  // props: ['menus','webSite']
  components: {
    Foo
  },
  props: {
    menus: {
      type: Array,
      required: true
    },
    webSite: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      content: '',
      site: 'www.baidu.com'
    };
  },
  methods: {
    add() {
      const content = this.content.trim();
      if(!content) {
        alert('菜名名称不能空！');
        return;
      }
      let menu = {
        id: 5,
        name: content
      };
      // 触发自定义事件addMenu
      // this.$emit('addMenu', menu);
      PubSub.publish('add',menu);
    }
  }
};
</script>

<style scoped>

</style>