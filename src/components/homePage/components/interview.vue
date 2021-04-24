<template>
  <div class="container">
    <div class="title">面试题区</div>
    
    <div class="item-container">
      <div class="paper-container" v-for="(item, index) in companyExercise" :key="index"> 
        <div class="interview-top">
          <div class="paper"></div>
          <div class="title-container">
            <div>
              <span>{{ item.company }}</span>面试题库
            </div>
            <div class="icon-container">
              <span class="exercise-container">
                <span class="exercise-icon"></span>
                <p>共{{ item.total }}题</p>
              </span>

              <span class="eye-container">
                <span class="eye-icon"></span>
                <p>{{ item.views }}人</p>
              </span>
              
            </div>
          </div>
        </div>
        <div class="x-button">
          <x-button @click.native="handleSkip(item.idList)">立即前往</x-button>
        </div>
      </div> 
    </div>
    
      
  </div>  
</template>

<script>
import XButton from '../../../common/button/index';
import { v4 as uuidv4 } from 'uuid';

export default {
  components: {
    XButton,
  },
  data() {
    return {
      interview: "",
      list: [1,2,3,4,5],
      companyExercise: ""  
    }
  },
  // watch
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  watch: {
    id(val) {
      this.queryExerciseBasic(val)
    }
  },
  methods: {
    queryExerciseBasic(id) {
      this.$ajax({
        url: '/api/filterate/basicCompany',
        method: 'get',
        params: {
          id: id
        }
      })
      .then(result => {
        let { exercises } = result.data.data;
        this.interview = exercises
        this.classifyInterview(this.interview)
      })
    },

    classifyInterview(interview) {
      let companyList = interview.map(item => item.company);
      let companySet = new Set(companyList);
      let companyExercise = [];
      let singleCompany = [...companySet]
      singleCompany.forEach(item => {
        let idList = interview.filter(interview => interview.company === item)
                              .map(ele => {
                                return {id: ele._id, views: ele.views}
                              })
        companyExercise.push({idList, company: item, total: idList.length, views: Math.max(...idList.map(item => item.views)) })
      })
      this.companyExercise = companyExercise;
    },

    handleSkip(list) {
      let idList = list.map(item => item.id)
                        .join()
      this.$router.push({
        name: 'summary',
        params: {
          company: '小米',
          id: list[0].id
        } 
      })
      let id = uuidv4();
      window.localStorage.setItem(id, idList)
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    margin: 0 auto;
    width: 1200px;
    background: #FFFFFF;
    
    .title {
      width: 400px;
      height: 28px;
      background: url("/src/image/title.png") 0 0 no-repeat;
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      color: #586AEA;
      line-height: 22px;
      margin: 0 auto;
      margin-bottom: 24px;
    }
    .item-container {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      .paper-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 200px;
        
        background: #FFFFFF;
        // box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        margin-bottom: 10px;
        box-sizing: border-box;

        .interview-top {
          display: flex;
          .paper {
            width: 80px;
            height: 80px;
            background: url("/src/image/paper.png");
            margin-right: 24px;
          }
          .title-container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 261px;
            .icon-container {
              display: flex;
              // justify-content: space-evenly;
              .exercise-container {
                display: flex;
                align-items: center;
                margin-right: 40px;
                .exercise-icon {
                  width: 26px;
                  height: 17px;
                  background: url("/src/image/exercise.png");
                }
              }
              .eye-container {
                display: flex;
                align-items: center;
                .eye-icon {
                  width: 20px;
                  height: 14px;
                  background: url("/src/image/eye.png");
                }
              }
              
              
            }
          }
        }
        .x-button {
          margin-top: 20px;
        }
        
      }
      .paper-container:hover {
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);

      }
    }
    
  }
</style>