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
        name: "Favoritos",
        components: {CardHolder, NavBar},
        data(){
            return{
                cards: null,
            }
        },
        mounted(){
            lib.getFavs()
                .then(this.loadCards)
                .catch(error => console.log(`Favorites ${error}`))
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