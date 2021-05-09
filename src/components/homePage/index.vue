<template>
  <div class="container">
    <!-- 图片横幅 -->
    <div class="banner">

    </div>
    <!-- 级联选择器 -->
    <filter-navbar @basicFilter="queryExerciseBasic">

    </filter-navbar>
    <!-- 面试题区 -->
    <inter-view :id="id" @clickButton="skipSummary">

    </inter-view>

  </div>
</template>

<script>
import SubNavbar from "@/components/subNavbar/index";
import FilterNavbar from "./components/filter";
import InterView from "./components/interview";
import tokenInstance from '@/utils/auth';
import { v4 as uuidv4 } from 'uuid';


export default {
  name: "homepage",
  components: {
    SubNavbar,
    FilterNavbar,
    InterView
  },
  data() {
    return {
      id: ""
    };
  },
  created() {
    console.log(tokenInstance.getUserInfo(), 'userid')
  },
  methods: {
    queryExerciseBasic(id) {
      this.id = id;
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
}
</style>
