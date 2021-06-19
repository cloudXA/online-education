<template>
  <div class="container">
    <div class="title">面试题区</div>

    <div class="item-container">
      <div class="paper-container" :key="index"
        v-for="(item, index) in companyExercise" 
        @mouseover="debounceOver($event)"
        @mouseleave="debounceLeave($event)"
        > 
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
        <div class="x-button-hidden" >
          <x-button @click.native="handleSkip(item.idList, item.company)">立即前往</x-button>
        </div>
      </div> 

      <!-- <not-found v-if="!companyExercise.length"></not-found> -->
      <div v-if="!companyExercise.length">
        <no-data></no-data>
        
      </div>
    </div>
    
  </div>  
</template>

<script>
import XButton from '../../../common/button/index';
import debounce from '@/utils/debounce';
/**
 * props: 
 *  id: 接收basic 基础id(最底层的分类id)
 * 组件功能：
 *  获取底层题目分类下的所有题目，然后基于公司分类整合为多个模块，用户点击，
 *  将所有题目id持久化本地，跳转到每个题目id详情(router: name:summary)。(题目详情中用户可以做题、
 *  检查题目等等) 
 * emit:
 *  clickButton 事件，载荷为题目id列表idList
 */
export default {
  name: 'InterView',
  components: {
    XButton,
  },
  data() {
    return {
      interview: "",
      test: "",
      list: [1,2,3,4,5],
      companyExercise: ""  
    }
  },
  // watch
  props: {
    id: {
      type: String,
      default: ""
    },

  },

  computed: {
    isAll() {
      return this.$store.getters.isAll
    }
  },


  watch: {
    id(val) {
      this.queryExerciseBasic(val)
    },

    isAll(val) {
      if(val) {
        this.queryExerciseBasic("all")
      }
    }
  },

  created() {
    this.queryExerciseBasic("all")
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
        if (id === "all") {
          let arrayList = result.data.data;
          let temp = [];
          for(let array of arrayList) {
            if(array.exercises.length !== 0) {
              temp.push(...array.exercises)
            }
          }
          this.interview = temp;
          this.classifyInterview(this.interview)

        } else {
          let { exercises } = result.data.data;

          this.interview = exercises
          this.classifyInterview(this.interview)
        }


      })
    },

    classifyInterview(interview) {
      let companyList;
      if(interview.length !== 0) {
        companyList = interview.length && interview.map(item => item.company);
      }
      let companySet = new Set(companyList);
      let companyExercise = [];
      let singleCompany = [...companySet]
      singleCompany.forEach(item => {
        let idList = interview.length && interview.filter(interview => interview.company === item)
                              .map(ele => {
                                return { 
                                  id: ele._id, 
                                  views: ele.views,
                                  property: ele.property
                                }
                              })

        companyExercise.push({
          idList, 
          company: item, 
          total: idList.length, 
          views: Math.max(...idList.map(item => item.views)) 
        })

      })

      this.companyExercise = companyExercise;

      this.$emit('transferExercise', this.classifyProperty(companyExercise));
    },

    /**
     * companyExercise 渲染公司题库的数据
     */
    classifyProperty(companyExercise) {
      let calData = [];

      companyExercise.forEach(item => {
          let propertyList = [...new Set(item.idList.map(item => item.property))]
          let temp = [];
          propertyList.forEach(property => {
              temp.push(item.idList.filter(list => list.property === property))
          })
          
          temp.forEach(tem => {
              calData.push({
                  idList: tem,
                  company: item.company,
                  views: item.views,
                  total: tem.length,
                  property: tem[0].property
              })
          })

      })

      return calData;
    },

    handleSkip(list) {
      this.$emit("clickButton", list); 
      
    },

    handleOver(event) {
      if(event.currentTarget) {
        event.currentTarget.children[1].className = "x-button-show"
      } 
    },

    handleLeave(event) {
      if(event.currentTarget) {
        event.currentTarget.children[1].className = "x-button-hidden"
      }
    },

    debounceOver(event) {
       debounce(this.handleOver, 500, true, event).call(null, event);
    },

    debounceLeave(event) {
      debounce(this.handleLeave, 500, true, event).call(null, event);
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    // margin: 0 auto;
    // width: 1200px;
    background: #FFFFFF;
    
    .title {
      width: 400px;
      height: 63px;
      background: url("/src/image/title.png") 0  no-repeat;
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      color: #586AEA;
      line-height: 63px;
      margin: 0 auto;
      margin-bottom: 24px;
    }
    .item-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
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
        .x-button-show {
          margin-top: 35px;
        }
        .x-button-hidden {
          display: none;
        }
        
      }
      .paper-container:hover {
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);

      }
    }
    
  }

</style>