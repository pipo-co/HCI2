<template>
    <div>
        <nav-bar :home="cards[0].room.home.name" :room="cards[0].getRoomName()"/>
        <v-container fluid>
            <v-row >
                <v-col>
                    <v-btn height="70" width="350" :to="{ name:'nuevodispositivo', params: { 'previousRoute': 'room', 'homeID': homeID, 'roomID': roomID } }"  class="text--secondary border-dashed" outlined>
                        <v-icon large dark outlined >mdi-plus</v-icon>
                        Agregar Dispositivo
                    </v-btn>
                </v-col>
            </v-row>
            <v-row wrap>
                <v-col>
                     <card-holder :card-array="cards"/>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import CardHolder from "./CardHolder";
    import NavBar from "./NavBar";
    const lib = require("../assets/js/lib.js");


    export default {
        name: "ViewRoom",
        components: {CardHolder, NavBar},
        data(){
            return{
                cards: null,
                homeID: null,
                roomID: null,
            }
        },
        mounted(){
            this.homeID = this.$route.params.homeID;
            this.roomID = this.$route.params.roomID;
            lib.getRoomDevices(this.roomID).then(this.loadCards).catch(error => console.log(`Favorites ${error}`));

        },
        methods:{
            loadCards(data){
                this.cards = data;
            }
        },
    }
</script>

<style scoped>
    .rounded{
        border-radius: 25px;
    }
    .v-card.rounded.v-sheet{
        border-radius: 25px;
    }
    .top-rounded{
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
    }
    .border-dashed{
        border-radius: 25px 25px 25px 25px;
        -moz-border-radius: 25px 25px 25px 25px;
        -webkit-border-radius: 25px 25px 25px 25px;
        border: 3px dashed #a6a6a6;

    }
</style>