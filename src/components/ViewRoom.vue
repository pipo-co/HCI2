<template>
    <div>
        <nav-bar :home="home.name" :room="room.name" :show-back="true"/>
        <v-container class="pa-0" fluid v-if="cards && cards.length !== 0">
            <v-row>
                <v-col class="pa-0">
                    <v-btn height="70" width="350"
                           :to="{ name:'nuevodispositivo', params: { 'previousRoute': 'room', 'homeID': home.id, 'roomID': room.id } }"
                           class="text--secondary border-dashed" outlined>
                        <v-icon large dark outlined >mdi-plus</v-icon>
                        Agregar Dispositivo
                    </v-btn>
                </v-col>
            </v-row>
            <v-row wrap no-gutters>
                <v-col>
                     <card-holder :card-array="cards"/>
                </v-col>
            </v-row>
        </v-container>
        <div v-else>
            <p>Cargando...</p>
        </div>
    </div>
</template>

<script>
    import CardHolder from "./CardHolder";
    import NavBar from "./NavBar";
    import {getRoomDevices} from "../assets/js/lib";


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
            getRoomDevices(this.room.id).then(this.loadCards).catch(console.log);
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