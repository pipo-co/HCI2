<template>
    <div><v-app-bar fixed color="#72E1C7">
        <v-row align="center" justify="center">
            <v-col cols="3">
                <v-toolbar-title color="3C3F58">SMARTIFY</v-toolbar-title>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="6" class="px-0">
                <v-tabs right color="#3C3F58" background-color="#72E1C7">
                    <v-tabs-slider color="#87FFE3"></v-tabs-slider>
                    <v-tab><v-icon right>mdi-magnify</v-icon></v-tab>
                    <v-tab to="/favoritos">Favoritos</v-tab>
                    <v-tab to="/">Hogares</v-tab>
                    <v-tab to="/rutinas">Rutinas</v-tab>
                    <v-tab to="/dispositivo/nuevodispositivo1">Consumos</v-tab>
                </v-tabs>
            </v-col>
        </v-row>
    </v-app-bar>
    <card-holder :card-array="cards"/>
    </div>
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