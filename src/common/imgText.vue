<template>
  <div class="container">
    <img :src="imgSrc" alt="">  
    <span>{{number}}人</span>
  </div>  
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
    imgSrc: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true
    }
  }

}
</script>

<style scoped lang="scss">
  .container {
    display: inline-block;
    img {
      vertical-align: middle;
    }
  }
</style>