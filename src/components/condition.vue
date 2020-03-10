<template>
  <div>
    <p>{{ name }}</p>
    <button @click="update()">update</button>
    <button @click="destory()">destroy</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    };
  },
  mounted() { //调用一次
    console.log('mounted()页面初始化成功');
    this.name = '初始化数据';
  },
  beforeUpdate() {
    console.log('beforeUpdate()数据属性变化之前');
  },
  updated() {
    console.log('update（）数据属性变化后');
  },
  beforeDestroy() {
    console.log('beforeDestory()vm要死了');
  },
  destroyed() { //调用一次
    console.log('destroyed()vm死掉了');
  },
  methods: {
    update() {
      this.name = '修改了数据';
    },
    destory() {
      this.$destroy();
    }
  },
};
</script>

<style>

</style>