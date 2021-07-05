<template>
    <div>
        <div v-if="Object.keys(exercise).length !== 0">
            <header class="header-container">
                <ul class="header-title">
                    <li :class="calculateMap(exercise, 'class')">
                        {{calculateMap(exercise, 'name')}}
                    </li>
                </ul>

                <ul class="icon-container">
                    <li class="icon">
                        <i class="iconfont icon-shoucang1" 
                        :class="{isActive: calculateMap(exercise, 'isCollect')}"></i>
                    </li>
                    <li class="statis">
                        <span>{{ order }}/</span>
                        <span>{{ total }}</span>
                    </li>
                </ul>

            </header>
            <main>
                <exercise 
                    :render="localExercise" 
                    :serial="order"
                    ref="exercise"
                    :isInput="true"
                    :isTag="false"
                >
                </exercise>
            </main>
            
        </div>

    </div>
</template>

<script>
import Exercise from '@/common/exercise/index'

const propertyMap = [
    {
        property: 1,
        name: '单选',
        class: 'single',
        isCollect: false
    },
    {
        property: 2,
        name: '多选',
        class: 'double',
        isCollect: false
    },
    {
        property: 3,
        name: '判断',
        class: 'judge',
        isCollect: false
    },
    {
        property: 4,
        name: '简答',
        class: 'short-answer',
        isCollect: false
    }
]

export default {
    name: 'Subject', // 题目（头部索引 + 题目）
    components: {
        Exercise,
    },
    props: {
        total: Number,
        order: Number,
        fresh: String,  // 用于刷新选项
        exercise: {
            type: Object,
            default: () => {}
        },
    },
    data() {
        return {
            localExercise: {}
        }
    },
    computed: {
        
    },
    watch: {
         exercise: {
             handler(newVal) {
                this.localExercise = newVal; 
             },
             deep: true,
             immediate: true
         }
    },
    methods: {
        calculateMap(exercise, distribute) {
            if(Object.keys(exercise).length) { 
                return propertyMap.filter(item => item.property === exercise.property)[0][distribute]
            }
        }
    },

}
</script>

<style  scoped lang="scss">
    .header-container {
        display: flex;
        justify-content: center;
        align-items: baseline;
        margin: 20px 0;
        .header-title {
            display: flex;
            justify-content: flex-end;
            .single {
                width: 240px;
                height: 30px;
                background: url("../../../image/single.png");
                text-align: center;
                line-height: 30px;

            } 
            .double {
                width: 240px;
                height: 30px;
                background: url("../../../image/double.png");
                text-align: center;
                line-height: 30px;

            }
            .judge {
                width: 240px;
                height: 30px;
                background: url("../../../image/judge.png");
                text-align: center;
                line-height: 30px;

            }
            .short-answer {
                width: 240px;
                height: 30px;
                background: url("../../../image/short.png");
                text-align: center;
                line-height: 30px;

            }
            
        }

        .icon-container {
            display: flex;
            align-items: baseline;
            position: absolute;
            right: 5%;
            .icon {
                width: 36px;
                height: 36px;
                background: #EDEDED;
                border-radius: 50%;
                text-align: center;
                line-height: 36px;
            }
            .statis {
                & > span:nth-child(1) {
                    color: #586AEA;
                    font-weight: 500;
                    font-size: 1.1rem;
                }
            }
        }
    }
        
    
</style>