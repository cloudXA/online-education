<template>
    <div class="knowledeg_container">
        <ul class="sub-know-container">
            <li>
                <span v-if="isTag" :class="[propertyMapType[localRender.property], 'property']">
                  {{propertyMap[localRender.property]}}
                </span>

                <span class="serial">{{ serial }}、</span>

                <span class="title">{{ localRender.title }}</span>
             
                <ul class="choose-container" v-if="localRender.choose && localRender.choose.length">
                  <li v-for="item, i in localRender.choose" 
                      :key="i" 
                      :class="[checkSolution(localRender, item)]"
                      @click="selectChoose($event, i)"
                  >
                    <x-input 
                      :type="mapType(localRender)" 
                      :value="Object.keys(item)[0].toUpperCase()" 
                      :ref="'xInput' + i" 
                      :id="'xInput' + i"
                      :index="i"
                      :reply="localRender.reply"
                      :solution="localRender.solution"
                      v-if="isInput"
                    >   
                    </x-input>
                    <span class="input-span"></span>    

                    <span>{{ Object.keys(item)[0].toUpperCase() }}、</span>

                    <label :for="Object.values(item)[0]">
                      {{ Object.values(item)[0] }}
                    </label>
                    
                  </li>

                </ul>
                
                <div v-if="'analysis' in localRender">
                
                  <!-- 正确答案  -->
                  <ul class="short-answer-container">
                    <li class="">正确答案:</li>
                    <li>{{ localRender.shortSolution }}</li>
                  </ul>

                  <!-- 简答解析 -->
                  <ul class="short-answer-analysis-container" v-if="true">
                    <li class="analysis-title">解析：</li>
                    <li class="analysis-content">{{ localRender.analysis }}</li>
                  </ul>

                  <!-- 浏览量等 -->
                  <ul class="sum-container">
                    <li class="views">
                      <i class="el-icon-view"></i>
                      <span>{{ localRender.views }}</span>
                    </li>
                    <li class="likes pointer" @click="handleLike($event, localRender._id, localRender.isLiked)">
                      <i :class="{'el-icon-star-off': !localRender.isLiked, 'el-icon-star-on': localRender.isLiked }"></i>
                      <span>{{ localRender.likes }}</span>
                    </li>
                  </ul>

                </div>
            </li>
        </ul>
       
  </div>
</template>

<script>
import XInput from '@/common/z-input/index';
import tokenInstance from '@/utils/auth';


const inputTypeMap = [
  {
    property: 1,
    type: 'radio'
  },
  {
    property: 2,
    type: 'checkbox'
  },
  {
    property: 3,
    type: 'judge'
  },
  {
    property: 4,
    type: 'short'
  }
]

export default {
    name: 'ExerciseDetail',
    components: {
      XInput
    },
    props: {
        reply: String,            // 用户响应reply
        isInput: Boolean,         // 是否展示input按钮
        render: {                 // 题目渲染数据
            type: Object,
            default: () => {}
        },
        serial: {                 // 题目序号
          type: Number,
          default: 1
        },
        isTag: {                  // 是否展示tag
          type: Boolean,
          default: true
        }
    },
    data() {
        return {
          state: "",              // success \ warning \ error \ common
          innerReply: [],         // 本地暂存用户选择的题目选项
          localRender: {},
          propertyMapType: {
            '1': 'single',
            '2': 'double',
            '3': 'judge',
            '4': 'short-answer'
          },
          propertyMap: {
            '1': '单选',
            '2': "多选",
            '3': '判断',
            '4': '简答'
          },
        }
    },

    watch: {
      render: {
        handler(newVal) {
          this.localRender = newVal;
          this.innerReply = newVal && newVal.reply && newVal.reply.split("")
        },
        deep: true,
        immediate: true
      }
    },

    created() {
    },


    
    methods: {
      checkSolution(render, item) {
        let state;
        let choose = Object.keys(item)[0];
        switch(render.property) { 
          case 1:  // 单选
            if (render.solution && render.solution.includes(choose)) {
              state = 'is-active'
            };
            break;
          case 2:  // 多选  
            // render.solution && render.solution.join("");
            if (render.solution && render.solution.join("").includes(choose)) {
              state = 'is-active'
            }

        }
        return state;
        
      },

      checkError(render, choose) {
        let replay = render.replay
        replay.forEach(item => {
          return render.solution && !render.solution.includes(replay);
        })
        
      },

      mapType(render) {
        console.log(render.property, 'render')
        return inputTypeMap.filter(item => {
          return item.property == render.property
        })[0].type
      },

      async selectChoose(event, index) {
        let target = this.$refs['xInput' + index][0];
        let id = this.localRender._id;   // 题目id
        let userId = JSON.parse(tokenInstance.getUserInfo());  // 用户信息id
        let value = target.value; // 题目信息

        this.$set(this.localRender, 'reply', "")

        if(target.type === 'radio') {
          this.localRender[0] = value;
          this.innerReply[0] = value

          // 传给渲染组件的是字符串
          this.$set(this.localRender, 'reply', value)
          this.$store.dispatch("reply/setReply", this.innerReply) 


        } else if (target.type === "checkbox") {

          if (this.innerReply.includes(value)) {
            let index = this.innerReply.indexOf(value)
            this.innerReply.splice(index, 1)

          } else {
            this.innerReply.push(value)
          }

          // 传给渲染组件的是数组 
          this.$set(this.localRender, 'reply', this.innerReply.join(""));

        }
       

        await this.$ajax({
                url: `/api/user/userAddReply`,
                method: 'post',
                data: {
                  exerId: id,
                  userId: userId,
                  reply: this.innerReply.join("")
                }
              })
      },

      /**
       * 清空选中效果
       */
      clearSelect() {
        this.localRender.choose.forEach((item,index) => {
            this.$el.querySelector('#xInput' + index).children[0].classList.remove('success')
          })
      }
      
    },


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