<template>
    <v-card class="disp">
        <v-container >
            <component :is="type" argv="hola"/>
        </v-container>
    </v-card>
</template>

<script>
    import AC from "./AC";
    import Speaker from "./Speaker";
    import Vacuum from "./Vacuum";
    import Door from "./Door";
    import Faucet from "./Faucet";
    import Oven from "./Oven";
    import Blinds from "./Blinds";
    import Lamp from "./Lamp";


    export default {
        name: "dispositivo",
        props:['type'],
        // props: {
        //     disp: {
        //         type: Object,
        //         required: true
        //     },
        // },
        components:{
            Speaker, AC, Vacuum, Door, Faucet, Oven, Blinds, Lamp
        },
        data() {
            return {
                dispType: 'oven'
            }

        }
    }
</script>

<style scoped>

</style>