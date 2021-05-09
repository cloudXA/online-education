<template>
    <div class="container">
        <span :class="[type, state]">
            <span class="pitch"></span>
        </span>
    </div>
</template>

<script>
export default {
    name: 'x-input',
    data() {
        return {

        }
    },
    props: {
        type: String,  // radio 单选 checked 多选
        state: String  // success 、 warning 、 error 
    }
}
</script>

<style lang="scss" scoped>
    $success: #586AEA;
    $warning: #ffcc00;
    $error: #cc3300;

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