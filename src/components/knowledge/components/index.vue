<template>
  <div class="knowledeg_container">
    <!-- {{ renderData }} -->
    <ul class="sub-know-container">
      <li v-for="(item, index) in renderData" :key="index">
        <span :class="[propertyMapType[item.property], 'property']">{{propertyMap[item.property]}}</span>
        <span class="serial">{{index + 1}}、</span>
        <span class="title">{{item.title}}</span>
        <!-- 单选 多选  -->
        <ul class="choose-container" v-if="[1,2].includes(item.property)">
          <li v-for="element,atom in item.choose" :key="atom" :class="{'is-active': item.solution.includes(solutionMapReverse[atom + 1]) }">
            {{chooseMap[atom+1].toUpperCase()}}、 {{ element[chooseMap[atom+1]] }}
          </li>
        </ul>
        <!-- 判断 -->
        <ul class="choose-container" v-if="[3].includes(item.property)">
          <li v-for="element,atom in item.choose" :key="atom" :class="{'is-active': item.solution.includes(String(atom)) }">
            {{ element[atom] }}
          </li>
        </ul>
        <!-- 简答答案 -->
        <ul v-if="[4].includes(item.property)" class="short-answer-container">
          <li class="">正确答案:</li>
          <li>{{item.shortSolution}}</li>
        </ul>
        

        <ul class="analysis-container" v-if="![4].includes(item.property)">
          <li class="analysis-title">解析：</li>
          <li class="analysis-content">{{ item.analysis }}</li>
        </ul>

        <!-- 简答解析 -->
        <ul class="short-answer-analysis-container" v-if="[4].includes(item.property)">
          <li class="analysis-title">解析：</li>
          <li class="analysis-content">{{ item.analysis }}</li>
        </ul>

        <ul class="sum-container">
          <li class="views">
            <i class="el-icon-view"></i>
            <span>{{item.views}}</span>
          </li>
          <li class="likes pointer" @click="handleLike($event, item._id, item.isLiked)">
            <i :class="{'el-icon-star-off': !item.isLiked, 'el-icon-star-on': item.isLiked }"></i>
            <span>{{item.likes}}</span>
          </li>
        </ul>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      renderData: '',
      handledChoose: '',
      isActive: false,
      propertyMap: {
          '1': '单选',
          '2': "多选",
          '3': '判断',
          '4': '简答'
      },
      propertyMapType: {
        '1': 'single',
        '2': 'double',
        '3': 'judge',
        '4': 'short-answer'
      },
      chooseMap: {
        '1': 'a',
        '2': 'b',
        '3': 'c',
        '4': 'd'
      },
      solutionMap: {
        'a': 1,
        'b': 2,
        'c': 3,
        'd': 4
      },
      solutionMapReverse: {
        '1': 'a',
        '2': 'b',
        '3': 'c',
        '4': 'd'
      }

    }
  },
  computed: {
    
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
  .knowledeg_container {
    .sub-know-container {
      display: grid;
      grid-template-columns: repeat(1, 1200px);
      row-gap: 20px; 
      & > li {
        padding: 20px;
        background: #ffffff;
        .property {
          display: inline-block;
          width: 51px;
          height: 20px;
          background: #ECFBE3;
          border-radius: 2px;
          border: 1px solid #74CA43;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #74CA43;
          line-height: 20px;
          text-align: center;
        }
        .single {
          border: 1px solid #74CA43;
          color: #74CA43;
          background: #ECFBE3;
        }
        .double {
          border: 1px solid #F46657;
          color: #F46657;
          background: #FFDDD9;

        }
        .judge {
          border: 1px solid #3FADDF;
          color: #3FADDF;
          background: #CDEFFF;
        }
        .short-answer {
          border: 1px solid #586AEA;
          color: #586AEA;
          background: #EBEDFF;
        }
        .title {
          font-size: 18px;
          color: #333333;
        }
        .choose-container {
          margin-top: 30px;
          margin-bottom: 30px;
          display: grid;
          row-gap: 20px;
          font-size: 14px;
          .is-active {
            color: #586AEA;
            font-size: 16px;
          }
        }
        .analysis-container {
          display: grid;
          grid-template-columns: 1fr 19fr;
          .analysis-title {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #586AEA;
            line-height: 22px;
          }
          .analysis-content {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 20px;
          }
        }
        .sum-container {
            margin-top: 18px;
            display: grid;
            grid-template-columns: 80px 80px;
            span {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
              line-height: 20px;
            }
            i {
              font-size: 20px;
            }
            .views, .likes {
              display: grid;
              grid-template-columns: 1fr 1fr;
              i {
                justify-self: center;
              }
            }
        }
        .short-answer-container {
          margin-top: 20px;
          margin-bottom: 30px;

          li:nth-child(1) {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #586AEA;
            margin-bottom: 5px;
          }
          li:nth-child(2) {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 20px;
          }
        }
        .short-answer-analysis-container {
          li:nth-child(1) {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #586AEA;
            line-height: 22px;
            margin-bottom: 5px;
          }
          li:nth-child(2) {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 20px;
          }
          background:  #F8F8F8;;
          padding: 10px 60px 27px 22px;
        } 
        .el-icon-star-on {
          color: #FFB25A
        }
      }
    }
  }
</style>