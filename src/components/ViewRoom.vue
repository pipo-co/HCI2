<template>
    <card-holder :card-array="cards"/>
</template>

<script>
    import CardHolder from "./CardHolder";
    const lib = require("../assets/js/lib.js");


    export default {
        name: "ViewRoom",
        components: {CardHolder},
        data(){
            return{
                cards: null,
            }
        },
        mounted(){
            lib.getRoomDevices(this.$route.params.roomID).then(this.loadCards).catch(error => console.log(`Favorites ${error}`));
        },
        methods:{
            loadCards(data){
                this.cards = data;
            }
        },
    }
</script>

<style scoped>

</style>