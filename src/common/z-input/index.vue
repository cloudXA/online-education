<template>
    <div class="container">
        <span :class="[type, innerState, selectedState]"  :value="value" ref="choose">
            <span class="pitch" :value="value"></span>
        </span>
        <slot></slot>

    </div>
</template>
 
<script>
/**
 * 单纯的渲染组件，接收reply数组，和value值比较判断
 */ 
export default {
    name: 'x-input',
    
    props: {
        type: String,           // radio 单选 checked 多选
        value: String,          // 选项值
        index: Number,
        solution: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            selectedState: "",
            innerReply: this.$attrs.reply
        }
    },
    computed: {
        innerState() {
            let replys = this.$attrs.reply && this.$attrs.reply.split("");
            let solution = this.solution && this.solution.map(item => item.toLocaleUpperCase())

            let solutions = this.solution.length ? solution.join("") : ""
            if (this.type === "radio") {  // 单选
                if(solutions && solutions.length) {

                    if(solutions.includes(replys) && replys && replys.includes(this.value)) {
                        return "success"
                    } else {
                        if(replys && replys.includes(this.value)) {
                            return "error"
                        }
                    }
                    
                } else {
                    if(replys && replys.includes(this.value)) {
                        return "success"
                    } 
                }
            } else if (this.type === "checkbox") { // 多选 
                if(solutions && solutions.length) {
                    if(solutions.length === replys.length) {

                        let isEque = solutions.split("").sort().join("") === replys.sort().join("");

                        if(isEque) {
                            if(replys && replys.includes(this.value)) {
                                return "success"
                            }

                        } else {
                            let matchList = [],
                            noMatch = [];

                            replys && replys.forEach(item => {
                                if(solutions.includes(item)) {
                                    
                                    matchList.push(item)
                                } else {
                                    noMatch.push(item)
                                }
                            })


                            if(noMatch.join("").includes(this.value)) {
                                return "error"
                            } 

                            if(matchList.join("").includes(this.value)) {
                                return "warning"
                            }
                        }

                    } else {
                        let matchList = [],
                           noMatch = [];

                        replys && replys.forEach(item => {
                            if(solutions.includes(item)) {
                                
                                matchList.push(item)
                            } else {
                                noMatch.push(item)
                            }
                        })

                        if(noMatch.join("").includes(this.value)) {
                            return "error"
                        } 

                        if(matchList.join("").includes(this.value)) {
                            return "warning"
                        }
                    }

                } else {
                    if(replys && replys.includes(this.value)) {
                        return "success"
                    }
                }
            }
           
        }
    },


    
}
</script>

<style lang="scss" scoped>
    $success: #586AEA;
    $warning: #ff8a1d;
    $error: #cc3300;
    $common: #cccccc;

    @mixin map-radio($color) {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid $color;

            .pitch {
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: $color;
                text-align: center;
            }
    }

    @mixin map-checkbox($color) {
        position: relative;
        border: 1px solid $color;
        .pitch {
            position: absolute;
            display: inline-block;
            transform: rotate(45deg);
            height: 17px;
            width: 9px;
            border-bottom: 4px solid $color;
            left: 6px;
            top: -4px;
            border-right: 4px solid $color;
    
        }
    }
    
    .container {
        display: inline-block;
    }
    div {
        & > span {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 1px solid #CCCCCC;
        }

        .radio {
            border-radius: 50%;
        }
        // 单选
        .success.radio {
            @include map-radio($success)
        }
        .warning.radio {
            @include map-radio( $warning)
        }
        .error.radio {
            @include map-radio($error)
        }
        .common.radio {
            @include map-radio($common)
        }

        // 多选
        .success.checkbox {
            @include map-checkbox($success)
        }
        .warning.checkbox {
            @include map-checkbox($warning)
        }
        .error.checkbox {
            @include map-checkbox($error)
        }

        
    }
</style>