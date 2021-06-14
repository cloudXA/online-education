<template>
    <div class="container">
        <div class="title">普通题区</div>
        <div class="question-area">
            <div v-for="(item,index) in ordinaryData" :key="index" class="question">
                <div class="item-container">
                    <div class="item-title">
                        {{ item.company }}面试题库
                    </div>
                    <div class="tag-container">
                        <div class="sub-container">
                            <div class="tag" :class="mapClass(item.property)">
                                {{ mapTag(item.property) }}  
                            </div>
                            <div class="eye-container">
                                <div class="eye"></div>
                                <div class="number">
                                    {{ item.views }}人
                                </div>
                            </div>
                        </div>
                        
                        <div class="forward" @click="skipArea(item.idList, item.company)">前往>></div>
                    </div>
                </div>
            </div>
            <div v-if="!ordinaryData.length">
                <no-data></no-data>
            </div>
        </div>
    </div>
</template>

<script>
const inputTypeMap = [
  {
    property: 1,
    type: 'radio',
    index: 0,
    value: "A",
    check: false,
    name: "单选",
    class: "single"
  },
  {
    property: 2,
    type: 'checkbox',
    index: 1,
    value: "B",
    check: true,
    name: "多选",
    class: 'double'
  },
  {
    property: 3,
    type: 'judge',
    index: 2,
    value: "C",
    name: "判断",
    class: 'judge'
  },
  {
    property: 4,
    type: 'short',
    index: 3,
    value: "D",
    name: "简答",
    class: "short"
  }
]
export default {
    name: 'ordinaryArea',
    props: {
        ordinaryData: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {

        }
    },
    created() {

    },
    methods: {
        mapTag(property) {
            return inputTypeMap.filter(item => item.property == property)[0]["name"]
        },

        mapClass(property) {
            return inputTypeMap.filter(item => item.property == property)[0]["class"]
        },

        skipArea(list) {
            this.$emit("clickButton", list); 
        }
      

    },

}
</script>

<style lang="scss" scoped>
    .container {
        margin: 0 auto;
        width: 1200px;
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

        .question-area {
            width: 1200px;
            .question {
                padding: 17px 20px 17px 40px;
                border-bottom: 1px solid #E5E5E5;
                .item-container {
                    display: flex;
                    flex-direction: column;

                    .item-title {
                        height: 50px;
                        font-size: 18px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #333333;
                        line-height: 25px;
                    }

                    .tag-container {
                        display: flex;
                        justify-content: space-between;
                        
                        .sub-container {
                            display: flex;
                            // justify-content: space-between;
                            .tag {
                                width: 51px;
                                height: 20px;
                                background: #FFDDD9;
                                border-radius: 2px;
                                border: 1px solid #F46657;
                                text-align: center;
                                line-height: 20px;
                                font-size: 12px;
                                font-weight: 400;
                                margin-right: 20px;
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
                            .short {
                                border: 1px solid #586AEA;
                                color: #586AEA;
                                background: #EBEDFF;
                            }

                            .eye-container {
                                display: flex;
                                align-items: center;
                                .eye {
                                    width: 20px;
                                    height: 14px;
                                    background: url("/src/image/eye.png");
                                    display: inline-block;
                                    margin-right: 3px;
                                }
                                .number {
                                    font-size: 14px;
                                    font-family: PingFangSC-Regular, PingFang SC;
                                    font-weight: 400;
                                    color: #999999;
                                    line-height: 20px;
                                }
                            }
                        }

                        .forward {
                            font-size: 14px;
                            font-family: PingFangSC-Regular, PingFang SC;
                            font-weight: 400;
                            color: #586AEA;
                            line-height: 20px;
                            cursor: pointer;
                        }
                        
                    }
                }
            }
        }
    }
</style>