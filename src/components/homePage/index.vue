<template>
  <div class="container">
    <!-- 图片横幅 -->
    <div class="banner"></div>

    <!-- 级联选择器 -->
    <filter-navbar 
        class="navbar"
        @basicFilter="queryExerciseBasic"
        @queryAllExercise="queryAllExercise"
    >

    </filter-navbar>

    <!-- 面试题区 -->
    <inter-view 
        class="interview"
        :id="id" 
        @clickButton="skipSummary"
        @transferExercise="receiptData"
        :isAll="isAll"
    >
    </inter-view>

    <!-- 普通题区 -->
    <ordinary-area
        class="ordinary"
        :ordinaryData="ordinaryData"
        @clickButton="skipSummary"
        >

    </ordinary-area>

    <footer-area></footer-area>

  </div>
</template>

<script>
import SubNavbar from "@/components/subNavbar/index";
import FilterNavbar from "./components/filter";
import InterView from "./components/interview";
import OrdinaryArea from './components/ordinary.vue'
import { v4 as uuidv4 } from 'uuid';


export default {
  name: "homepage",
  components: {
    SubNavbar,
    FilterNavbar,
    InterView,
    OrdinaryArea,
  },
  data() {
    return {
      id: "",
      ordinaryData: [],
      isAll: false
    };
  },
 
  methods: {
    queryExerciseBasic(id) {
      this.id = id;
    },

    queryAllExercise() {
      this.isAll = true
    },

    skipSummary(list, company) {
      let idList = list.map(item => item.id)
      let jointId = idList.join();

      let companyId = uuidv4();   

      this.$router.push({
        name: 'summary',
        params: {
          companyId: companyId,
          id: idList[0]
        } 
      })
      
      window.localStorage.setItem(companyId, jointId)
    },

    receiptData(data) {
      // alert(data)
      console.log(data, 'data')
      this.ordinaryData = data
    } 

    
  }
};
</script>

<style lang="scss">
.container {
  background: #f8f8f8;
  .banner {
    cursor: pointer;
    width: 100%;
    height: 560px;
    background-image: url("../../image/banner.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }
  .ordinary, .interview {
    margin-top: 20px;
  }
}
</style>
