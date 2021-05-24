<template>
    <div>
        <div>
            <header>
                <ul class="header">
                    <li :class="calculateMap(exercise, 'class')">
                        {{calculateMap(exercise, 'name')}}
                    </li>
                    <li>
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
                    </li>
                </ul>
            </header>
            <main>
                <exercise 
                    :render="localExercise" 
                    :serial="order"
                >
                </exercise>
            </main>
            
        </div>
        <div></div>
    </div>
</template>

<script>
import Exercise from './components/exercises';
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
        class: 'multiple',
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
        class: 'short',
        isCollect: false
    }
]

export default {
    name: 'Subject', // 题目（头部索引 + 题目）
    components: {
        Exercise,
    },
    props: {
        exercise: {
            type: Object,
            default: () => {}
        },
        total: Number,
        order: Number,
        fresh: String,  // 用于刷新选项
        
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
            // vue组件渲染顺序：1 props默认值 ---> 2 传递过来的prop值 
            if(Object.keys(exercise).length) { 
                return propertyMap.filter(item => item.property === exercise.property)[0][distribute]
            }
        }
    },

}
</script>

<style  scoped lang="scss">
    .header {
        display: flex;
        justify-content: flex-end;
        align-items: baseline;
        margin-right: 40px;
        margin-top: 40px;
        .single {
            width: 240px;
            height: 30px;
            background: url("../../../image/single.png");
            text-align: center;
            line-height: 30px;

        }
        & > li:nth-child(2) {
            margin-left: 368px;
        }

        .icon-container {
            display: flex;
            align-items: baseline;
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