<template>
    <div>
        <nav-bar/>
        <card-holder v-if="cards.length !== 0" :card-array="cards"/>
        <div v-else>
            <h1>No hay dispositivos marcados como favoritos.</h1>
            <br>
            <h3>Para agregar un dispositivo, busque la tarjeta correspondiente y apriete el corazon (<v-icon>mdi-heart</v-icon>). </h3>
            <h3>Si el corazon esta de color rojo (<v-icon color="red">mdi-heart</v-icon>) indica que la tarjeta esta marcada como favorito</h3>
        </div>
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