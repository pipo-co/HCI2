<template>
    <component :is="componentName" :params="params" :actionName="actionName" :key="actionName" @change="$emit('change', $event)"/>
</template>

<script>
    import SupportedValues from "./SupportedValues";
    import NumberValue from "./NumberValue";

    export default {
        name: "ActionRouter",
        props: {
            actionName:{
                type: String,
                require: true,
            },
            params:{
                type: Object,
                require: true,
            }
        },
        components:{SupportedValues, NumberValue},
        computed:{
            componentName(){
                if(this.params.type === 'string')
                    return 'supported-values'
                else
                    return 'number-value'
            }
        }
    }
</script>

<style scoped>

</style>