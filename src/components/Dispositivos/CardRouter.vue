<template>
    <component :is="typeName" :props="card"/>
</template>

<script>
    import Ac from "./Ac";
    import Speaker from "./Speaker";
    import Vacuum from "./Vacuum";
    import Door from "./Door";
    import Faucet from "./Faucet";
    import Oven from "./Oven";
    import Blinds from "./Blinds";
    import Lamp from "./Lamp";

    export default {
        name: "card-router",
        props: {
            card: {
                type: Object,
                require: true,
            }
        },
        components:{
            Speaker, Ac, Vacuum, Door, Faucet, Oven, Blinds, Lamp
        },
        data() {
            return {
                typeName: this.card.type.name
            }
        }
    }
</script>

<style scoped>

</style>