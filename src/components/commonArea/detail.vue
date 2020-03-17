<template>
  <div class="lists">
    <img src="./image/热门.png" alt="">
    <div class="container">
      <div>开始</div>
      <el-tag type="success">判断</el-tag>
      <Eyes :imgSrc="src" :number="number"></Eyes>
    </div>
  </div>
</template>

<script>

import Eyes from '@/common/imgText.vue'

export default {
  data() {
    return {
      src: '/src/assets/browser.png',
      number: 2
    }
  },
  components: {
    Eyes
  },
  mounted() {
    // 请求公司面试题库 
  }
}
</script>

<style scoped lang="scss">
  .lists {
    width: 1200px;
    height: 120px;
    margin: 0 auto;
  }
  img {
    vertical-align: top;
    margin-right: 10px;
  }
  .container {
    display: inline-block;
    div {
      margin-bottom: 10px;
    }
  }
</style>