<template>
    <div>
        <nav-bar/>
    <card-holder :card-array="cards"/>
    </div>
</template>

<script>
    import CardHolder from "./CardHolder";
    import NavBar from "./NavBar";
    const lib = require("../assets/js/lib.js");


    export default {
        name: "ViewDeviceType",
        components: {CardHolder, NavBar},
        data(){
            return{
                cards: null,
            }
        },
        mounted(){
            lib.getDevicesByHomeAndType(this.$route.params.homeID, this.$route.params.deviceTypeName)
                .then(this.loadCards)
                .catch(error => console.log(`View Device Types ${error}`));
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