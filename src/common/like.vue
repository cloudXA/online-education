<template>
  <div class="container">
    <img :src="imageSrc" alt="" @click="like">  
    <span>{{number}}</span>
  </div>  
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    like() {
      
    }
  },
  props: {
    number: {
      type: Number,
      required: true
    },
    imageSrc: {
      type: String,
      required: true
    }
  }

}
</script>

<style scoped lang="scss">
  .container {
    img {
      vertical-align: middle;
    }
  }
</style>