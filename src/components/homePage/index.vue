<template>
  <div class="container">
    <!-- TODO: bug 图片未能全部拓展 -->
    <div class="banner">
    </div>
    <sub-navbar></sub-navbar>
    <interview-area></interview-area>
    
  </div>
</template>

<script>
import SubNavbar from '@/components/subNavbar/index'
import InterviewArea from '@/components/interviewArea/index'

export default {
  components: {
    SubNavbar,
    InterviewArea
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scope>
  .container {
    width: 100%;
  }
  .banner {
    cursor: pointer;
    // width: 100%;
    height: 560px;
    background-image: url('./image/banner.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }
  @media (min-width: 1024px) {
    .banner {
      height: 560px;
      background-image: url('./image/banner@2x.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
    }
  }
</style>