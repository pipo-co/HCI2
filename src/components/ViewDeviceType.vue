<template>
    <card-holder :card-array="cards"/>
</template>

<script>
    import CardHolder from "./CardHolder";
    const lib = require("../assets/js/lib.js");


    export default {
        name: "ViewDeviceType",
        components: {CardHolder},
        data(){
            return{
                cards: null,
            }
        },
        mounted(){
            lib.getDevicesByHomeAndType(this.$route.params.homeID, this.$route.params.deviceTypeName)
                .then(this.loadCards)
                .catch(error => {
                    console.log(`View Device Types ${error}`)
                });
        },
        methods:{
            loadCards(data){
                if(data.length === 0)
                        this.$router.push({name: "pageNotFound"});
                else
                    this.cards = data;
            }
        },
    }
</script>

<style scoped>

</style>