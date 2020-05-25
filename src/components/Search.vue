<template>
    <div>
        <nav-bar :show-back="true"></nav-bar>
        <h1>Dispositivos encontrados al buscar: {{$route.params.name}}</h1>
        <card-holder v-if="successfulSearch" :card-array="cards"/>
        <div v-else-if="!loading">
            <p>Tu búsqueda no fue exitosa. Intenta de nuevo</p>
        </div>
        <p v-else>Cargando...</p>
    </div>
</template>

<script>
    import CardHolder from "./CardHolder";
    import NavBar from "./NavBar";
    import {searchDevicesByName} from "../assets/js/lib";

    export default {
        name: "Search",
        components: {NavBar, CardHolder},
        data(){
            return{
                cards: null,
                loading: true,
                successfulSearch: false
            }
        },
        methods:{
            start(){
                this.loading = true;
                this.successfulSearch = false;
                searchDevicesByName(this.$route.params.name)
                    .then(this.loadCards)
                    .catch(console.log)
                    .finally(() => this.loading = false);
            },
            loadCards(data){
                if(data.length !== 0) {
                    this.cards = data;
                    this.successfulSearch = true;
                }
            }
        },
        mounted(){
            this.start();
        },
        watch: {
            '$route.params.name'(){
                this.start();
            }
        }
    }
</script>

<style scoped>

</style>