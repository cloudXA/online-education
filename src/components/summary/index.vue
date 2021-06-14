<template>
  <div class="cont">
    <nav-bar></nav-bar>

    <subject 
      :exercise="exercise" 
      :total="total" 
      :order="exerciseIndex"
      class="sub-container"
      :fresh="fresh"
      ref="subject"
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

      <x-button 
          class="next" 
          character="done" 
          v-if="exerciseIndex === total && isDone"

      >
        交卷
      </x-button>

      <x-button 
          class="back" 
          character="back" 
          v-if="exerciseIndex === total"
      >
        返回
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
      isAll: 0,             // 默认不需要答案信息
      reply: "",
      isDone: true,         // 是否展示交卷按钮
    }
  },
  computed: {
    exerId() {
      return this.$route.params.id
    },
    userId() {
      let userId = JSON.parse(tokenInstance.getUserInfo());  // 用户信息id
      return userId
    },
    exerIdList() {
      return this.calculateExerId('content')
    },
  },
  /**
   * 监听访问的路由变化
   */
  watch: {
    exerId(newVal) {
      let idList = this.calculateExerId('content');
      this.exerciseIndex = idList.indexOf(newVal) + 1;
    },
    reply(newVal) {
      this.$set(this.exercise, 'reply', newVal);
      // this.inner
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
    this.renderData(to.params.id, this.isAll, this.userId)
    next(); 
  },

  methods: {
    /**
     * id: 题目id
     * isAll 是否获取答案信息 0 不获取 1 获取
     */
    getExercise(id, isAll) {
      return new Promise((resolve,reject) => {
          this.$ajax({
            url: `/api/exercise/${id}/?answer=${isAll}`,
            method: 'get'
          }).then(data => {
            resolve(data.data.doc)
          })
          .catch(err => {
            reject(err)
          })
        })
    },

    /**
     *  基于用户id获取回显数据信息
    */ 
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
     * 处理last next done back按钮
     */
    handleClick(event) {
      let character = event.target.getAttribute('character');

      if(character === 'last') {  // last
        let index = this.calculateExerId('content').indexOf(this.$route.params.id);
        let currentId = this.exerIdList[index - 1];
        this.toRoute(currentId);

      } else if (character === "next") {   // next
        this.exerciseIndex++;
        let currentId = this.exerIdList[this.exerciseIndex - 1]
        this.toRoute(currentId);

      } else if (character === "done"){
        this.isAll = 1; 
        this.toRoute(this.exerIdList[0])

        this.isDone = false

      } else {
        this.isAll = 0;
        this.removeCallback(this.userId)

        this.$router.push({
          name: 'home'
        })
      }
      
    },

    /**
     * 路由跳转封装
     */
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
     * 初始化题目数据,触发条件有：1.0 created 2.0 路由跳转
     * id: 题目id
     * isAll 
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

    /**
     * 移除题目回显
     */
    removeCallback(userId) {
        return new Promise((resolve,reject) => {
          this.$ajax({
            url: `/api/user/userReplyRemove`,
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
  .last {
    margin-right: 20px;
  }
  .next {
    margin-right: 20px;
  }

 
</style>