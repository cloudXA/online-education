<template>
  <div class="cont">
    <nav-bar></nav-bar>

      <subject 
        :exercise="exercise" 
        :total="total" 
        :order="exerciseIndex"
        class="sub-container"
        :fresh="fresh"
      >
      </subject>
    

    <div class="footer" @click="handleClick">
      <x-button 
          class="last"
          v-if="exerciseIndex !== 1" 
          :exerIndex="exerciseIndex"
          character="last"
      >
        上一题
      </x-button>

      <x-button 
          class="next" 
          character="next" 
          v-if="exerciseIndex !== total"
      >
        下一题
      </x-button>
    </div>
    
  </div>  
</template>

<script>
import NavBar from '../navbar/index';
import Subject from './components/subject';
import XButton from '@/common/button/index.vue'
import tokenInstance from '@/utils/auth';

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
      exerciseIndex: 1,
      fresh: "",
      isAll: 0,
      reply: ""
    }
  },
  computed: {
    exerId() {
      return this.$route.params.id
    },
    userId() {
      let userId = JSON.parse(tokenInstance.getUserInfo());  // 用户信息id
      return userId
    }
  },
  /**
   * 监听访问的路由变化
   */
  watch: {
    exerId(newVal) {
      let idList = this.calculateExerId('content');
      this.exerciseIndex = idList.indexOf(newVal) + 1;
    },
  },
  /**
   * exerciseIndex: this.$route.params.exerciseIdList
   */
  async created() {
    // 请求获取题目信息
    this.renderData(this.$route.params.id, this.isAll, this.userId);

  },
  /**
   * 使用组件路由钩子
   */
  beforeRouteUpdate(to, from, next) {
    console.log(from, 'from')
    this.renderData(to.params.id, this.isAll, this.userId)
    next(); 
  },

  methods: {
    getExercise(id, isAll) {
      return new Promise((resolve,reject) => {
          this.$ajax({
            url: `/api/exercise/${id}/?answer=0`,
            method: 'get'
          }).then(data => {
            resolve(data.data.doc)
          })
          .catch(err => {
            reject(err)
          })
        })
    },

    // 获取回显数据信息
    getCallback(userId) {
      return new Promise((resolve,reject) => {
          this.$ajax({
            url: `/api/user/userCallback`,
            method: 'post',
            data: {
              userId: userId
            }
          }).then(data => {
            resolve(data.data.data)
          })
          .catch(err => {
            reject(err)
          })
        })
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
    async renderData(id, isAll, userId) {
      Promise.all([this.getExercise(id, isAll), this.getCallback(userId)])
              .then(datas => {
                let originExercise = datas[0];
                let reply = datas[1].exerReply.filter(reply => {
                  return reply.exerId === id
                });
                
                if(reply.length) {
                  this.reply = reply[0].reply[0].reply;
                  originExercise.reply = this.reply
                }

                this.exercise = originExercise;
              })
              
      this.total = this.calculateExerId('length');
    },

    
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