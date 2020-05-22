<template>
    <card-holder v-if="successfulSearch" :card-array="cards"/>
    <div v-else-if="!loading">
        <p>Tu busqueda no fue exitosa. Intenta de nuevo</p>
    </div>
    <p v-else>Loading...</p>
</template>

<script>
    import CardHolder from "./CardHolder";
    const lib = require("../assets/js/lib.js");

    export default {
        name: "Search",
        components: {CardHolder},
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
                lib.searchDevicesByName(this.$route.params.name)
                    .then(this.loadCards)
                    .catch(error => console.log(`Search ${error}`))
                    .finally(() => this.loading = false);
            },
            loadCards(data){
                console.log(data);
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