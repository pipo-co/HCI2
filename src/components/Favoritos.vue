<template>
    <v-container >
        <v-row justify="center">
            <v-col md="8">
                <v-row>
                    <v-col md="6" v-for="card in cards" :key="card.id">
                        <card-router :card="card"></card-router>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import CardRouter from "./Dispositivos/CardRouter";
    const lib = require("../assets/js/lib.js")

    export default {
        name: "Favoritos",
        components: {CardRouter},
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