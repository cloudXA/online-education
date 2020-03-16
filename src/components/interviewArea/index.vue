<template>
  <div class="container">
    <h2 class="interviewTitle">
      面试题区
    </h2>
    <interview-item></interview-item>
  </div>
   
</template>

<script>
import InterviewItem from './interviewItem'
export default {
  components: {
    InterviewItem
  }
}
</script>

<style lang="scss" scope>
  .interviewTitle {
    width: 400px;
    height: 25px;
    margin: 0 auto;
    background-image: url('./image/interview.png');
    text-align: center;
    font-size:24px;
    font-weight:500;
    color:rgba(88,106,234,1);
    line-height: 25px;
  }
</style>