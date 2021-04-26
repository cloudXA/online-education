<template>
    <div>
        <!-- {{ exercise }} -->
        <div>
            <title>
                <ul>
                    <li ></li>
                    <li>

                    </li>
                </ul>
            </title>
        </div>
        <div></div>
    </div>
</template>

<script>
const propertyMap = [
    {
        index: 1,
        name: '单选',
        class: 'single'
    },
    {
        index: 2,
        name: '多选',
        class: 'multiple'
    },
    {
        index: 3,
        name: '判断',
        class: 'judge'
    },
    {
        index: 4,
        name: '简答',
        class: 'short'
    }
]
export default {
    name: 'exercise',
    props: {
        exercise: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {

        }
    },
    computed: {
        
    },

}
</script>

<style>

</style>