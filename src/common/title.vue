<template>
  <div class="container">
    <p class="interviewTitle">
      <img :src="url.src" alt="标题栏" width="400" height="25">
      <span><slot name="title">面试题区</slot></span>
    </p>
  </div>
   
</template>

<script>
export default {
 data() {
   return {

   }
 },
 props: {
   url: {
     type: Object,
     required: true
   }
 }
}
</script>

<style lang="scss" scoped>
  .interviewTitle {
    text-align: center;
    position: relative;
    span {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 50%);
      color: #586AEA;
      font-size: 24px;
      top: -70%;
    }
  }
</style>