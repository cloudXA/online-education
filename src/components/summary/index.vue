<template>
  <div class="cont">
    <nav-bar></nav-bar>

    <subject :exercise="exercise" 
              :total="total" 
              :order="exerciseIndex"
              class="sub-container"
              >
    </subject>

    <div class="footer" @click="handleClick">
      <x-button class="last"
          v-if="exerciseIndex !== 1" 
          :exerIndex="exerciseIndex"
          character="last"
      >
        上一题
      </x-button>

      <x-button class="next" character="next" v-if="exerciseIndex !== total">下一题</x-button>
    </div>
    
  </div>  
</template>

<script>
import NavBar from '../navbar/index';
import Subject from './components/index';
import XButton from '@/common/button/index.vue'


export default {
  name: 'Summary',
  components: {
    NavBar,
    Subject,
    XButton

  },

  data() {
    return {
      exercise: {},
      total: 0,
      exerciseIndex: 1
    }
  },
  computed: {
    exerId() {
      return this.$route.params.id
    }
  },
  watch: {
    exerId(newVal) {
      let idList = this.calculateExerId('content');
      console.log(idList.indexOf(newVal), 'index')
      this.exerciseIndex = idList.indexOf(newVal) + 1;
    },
  },
  /**
   * exerciseIndex: this.$route.params.exerciseIdList
   */
  async created() {
    this.renderData(this.$route.params.id);
    
  },

  beforeRouteUpdate(to, from, next) {
    this.renderData(to.params.id, this.exerciseIndex - 1)
    next();
  },

  methods: {
    async getExercise(id) {
      let result = await this.$ajax({
                            url: `/api/exercise/${id}`,
                            method: 'get'
                          })
      return result.data.doc
    },
    /**
     * 处理last next按钮
     */
    handleClick(event) {
      let character = event.target.getAttribute('character');
      let exerIdList = this.calculateExerId('content')

      if(character === 'last') {  // last
        let index = this.calculateExerId('content').indexOf(this.$route.params.id);
        let currentId = exerIdList[index - 1];
        
        this.toRoute(currentId);

      } else {   // next
        this.exerciseIndex++;
        let currentId = exerIdList[this.exerciseIndex - 1];
        this.toRoute(currentId);
      }
      
    },
    toRoute(id) {
      this.$router.push({
          name: 'summary',
          params: {
            companyId: this.$route.params.companyId,
            id: id
          } 
        })
    },
    /**
     * 计算题目id总长度or数组
     */
    calculateExerId(identify) {
      let jointId = localStorage.getItem(this.$route.params.companyId);
      let idList = jointId.split(",");
      switch(identify) {
        case 'length':
          return idList.length
        case 'content':
          return idList
      }
      
    },
    /**
     * 初始化题目数据
     */
    async renderData(id) {
      this.exercise = await this.getExercise(id);
      this.total = this.calculateExerId('length');
    }
  }
}
</script>

<style lang="scss" scoped>
  .sub-container,.footer {
    width: 1200px;
    margin: 0 auto;
  }
  .footer {
    display: flex;
    justify-content: center;
  }

 
</style>