<template>
    <div>
        <nav-bar :home="home.name" :room="room.name"/>
        <v-container fluid>
            <v-row >
                <v-col>
                    <v-btn height="70" width="350"
                           :to="{ name:'nuevodispositivo', params: { 'previousRoute': 'room', 'homeID': home.id, 'roomID': room.id } }"
                           class="text--secondary border-dashed" outlined>
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
                home:{
                  id: this.$route.params.homeID,
                  name: null,
                },
                room:{
                  id: this.$route.params.roomID,
                  name: null,
                },

            }
        },
        mounted(){
            lib.getRoomDevices(this.room.id).then(this.loadCards).catch(error => console.log(`Favorites ${error}`));
        },
        methods:{
            loadCards(data){
                if(data.length === 0)
                    this.$router.push({name: "pageNotFound"});
                else {
                    this.cards = data;
                    this.home.name = data[0].room.home.name;
                    this.room.name = data[0].getRoomName();
                }
            }
        },
    }
</script>

<style scoped>
    .border-dashed{
        border-radius: 25px 25px 25px 25px;
        -moz-border-radius: 25px 25px 25px 25px;
        -webkit-border-radius: 25px 25px 25px 25px;
        border: 3px dashed #a6a6a6;
    }
</style>