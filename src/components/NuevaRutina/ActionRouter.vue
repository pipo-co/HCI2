<template>
    <component :is="componentName" :params="params" :key="params.name" @change="$emit('change', $event)"/>
</template>

<script>
    import SupportedValues from "./SupportedValues";
    import NumberValue from "./NumberValue";

    export default {
        name: "ActionRouter",
        props: {
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