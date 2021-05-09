<template>
    <div class="knowledeg_container">
        <ul class="sub-know-container">
            <li>
                <span class="serial">{{ serial }}、</span>
                <span class="title">{{ render.title }}</span>
                <ul class="choose-container"  @click="handleSubmit($event)">
                  <li v-for="item, i in render.choose" :key="i" 
                      :class="[checkSolution(render, item), ]"
                        >
                    <!-- <input :type="mapInput(render)" :name="i"
                            v-if="!render.replay" :id="i"
                            :value="Object.keys(item)[0].toUpperCase()" 
                        >  -->

                    <x-input :type="mapInput(render)" :state="'error'"></x-input>

                    <span class="input-span"></span>    

                    <span>{{ Object.keys(item)[0].toUpperCase() }}、</span>
                    <label :for="Object.values(item)[0]">{{ Object.values(item)[0] }}</label>
                    
                  </li>
                </ul>
            </li>
        </ul>
       
  </div>
</template>

<script>
/**
 * props: 
 *  render: 需要渲染的某一个题目数据
 *  serial: 所有的需要渲染的题目数量
 * 
 * 功能:
 *  能够将用户针对题目 && 用户id关联的题目id && 该题目下用户选中选项的添加。页面刷新，数据持久化，
 *  题目答案回显。解析、答案、错误信息样式展示。 
 */
import XInput from '@/common/z-input/index'
const propMap = [
  {
    index: "1",
    type: "single",
    header: "A",
    isActive: false,
  }
]

const inputTypeMap = [
  {
    property: 1,
    type: 'radio'
  },
  {
    property: 2,
    type: 'checkbox'
  }
]

export default {
    name: 'ExerciseDetail',
    components: {
      XInput
    },
    props: {
        render: {
            type: Object,
            default: () => {}
        },
        serial: {
          type: Number,
          default: 1
        }
    },
    data() {
        return {

        }
    },

    created() {
      console.log('hi')
    },

    methods: {
      checkSolution(render, item) {
        let state;
        let choose = Object.keys(item)[0];
        switch(render.property) { 
          case 1:  // 单选
            if (render.solution.includes(choose)) {
              state = 'is-active'
            };
            break;
          case 2:  // 多选  TODO: 后端返回replay
            render.solution.join();
            render.replay

        }
        return state;
        
      },

      checkError(render, choose) {
        let replay = render.replay
        replay.forEach(item => {
          return !render.solution.includes(replay);
        })
        
      },

      mapInput(render) {
        return inputTypeMap.filter(item => {
          return item.property == render.property
        })[0].type
      },

      handleSubmit(event) {
        console.log(event.target, 'event')
        // TODO: 提交
        // this.$ajax({
        //   url: 
        // })
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

        .item {
          color: red;
        }
      }
    }
  }
</style>