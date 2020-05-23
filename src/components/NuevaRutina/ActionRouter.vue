<template>
    <component :is="componentName" :params="params" :rooms="rooms" :key="params.name" @change="$emit('change', $event)"/>
</template>

<script>
    import SupportedValues from "./SupportedValues";
    import NumberValue from "./NumberValue";
    import RoomValue from "./RoomValue";
    import ColorValue from "./ColorValue";

    export default {
        name: "ActionRouter",
        props: {
            actionName: {
                type: String,
                require: true
            },
            rooms: {
                type: Array
            },
            params:{
                type: Object,
                require: true
            }
        },
        components: {SupportedValues, NumberValue, RoomValue, ColorValue},
        computed:{
            componentName(){
                if(this.actionName === 'setLocation')
                    return 'room-value';

                else if(this.actionName === 'setColor')
                    return 'color-value';

                else if(this.params.type === 'string')
                    return 'supported-values';

                else // Integer y Numeric
                    return 'number-value';
            }
        }
    }
</script>

<style scoped>

</style>