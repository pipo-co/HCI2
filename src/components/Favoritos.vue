<template>
    <div>
        <nav-bar/>
        <card-holder v-if="!loading && cards && cards.length !== 0" :card-array="cards"/>
        <div v-else-if="!loading">
            <h1>No hay dispositivos marcados como favoritos.</h1>
            <br>
            <h3>Para marcar un dispositivo como tal, busque la tarjeta correspondiente y aprete el corazon (<v-icon>mdi-heart</v-icon>). </h3>
            <h3>Si el corazón está de color rojo (<v-icon color="red">mdi-heart</v-icon>) indica que la tarjeta está marcada como favorito</h3>
        </div>
        <div v-else>
            <p>Cargando...</p>
        </div>
    </div>
</template>

<script>
    import CardHolder from "./CardHolder";
    import NavBar from "./NavBar";
    import {getFavs} from "../assets/js/lib";

    export default {
        name: "Favoritos",
        components: {CardHolder, NavBar},
        data(){
            return{
                cards: null,
                loading: true
            }
        },
        mounted(){
            getFavs()
                .then(this.loadCards)
                .catch(console.log)
        },
        methods:{
            loadCards(data){
                this.cards = data;
                this.loading = false;
            }
        },
    }
</script>

<style scoped>

</style>