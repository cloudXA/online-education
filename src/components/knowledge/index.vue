<template>
  <div>
    <div>
      <ul>
        <li v-for="(item, index) in renderData" :key="index">
          <exercise
              :render="item"
              :serial="index + 1"
              :property="String(item.property)"
              :isInput="isInput"
              ref="exercise"
          >
          </exercise>
        </li>
      </ul>
    </div>

    <footer-area v-if="renderData"></footer-area>

  </div>
</template>

<script>
// import QuestionTip from './components/index'
import Exercise from '@/common/exercise/index'

export default {
  name: "knowledge",
  components: {
    // QuestionTip,
    Exercise
  },
  data() {
    return {
      renderData: "",
      isInput: false   // 不展示题目选项前面的选中按钮
    }
  },

  created() {
    this.queryExercise();
  },

  methods: {
    handleLike(event, id, isLiked) {
      if(isLiked) {
        this.$ajax({
          url: '/api/likes/cancel',
          method: 'post',
          data: {id}
        })
        .then(() => {
          this.queryExercise();
        })

      } else {
        this.$ajax({
          url: '/api/likes/add',
          method: 'post',
          data: {id}
        })
        .then(() => {
          this.queryExercise();
        })
      }
    },

    /**
     * 请求exercise 
     */
    queryExercise() {
      this.$ajax({
          url: '/api/exercise',
          method: 'get',
      })
        .then(result => {
          this.renderData = result.data.result;
          
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .knowledeg_containers {
    .sub-know-containers {
      
    }
  }
</style>