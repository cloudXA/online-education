<template>
  <div>
    <!-- <a :href="webSite.url" target="_blank" :title="webSite.title">
      <img src="@/assets/logo.png" alt="logo">
    </a>
    <ul>
      <li v-for= "(item, index) in menus" :key="index">{{item.name}}</li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: 'Components',
  // 声明接收属性,这个属性就会成为组件对象的属性 
  // props: ['menus','webSite']
  props: {
    menus: {
      type: Array,
      required: true
    },
    webSite: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>

</style>