<template>
    <div>
        <nav-bar :home="home.name" :room="room.name" :show-back="true"/>
        <div v-if="cards && cards.length !== 0">
            <card-holder :card-array="cards"/>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>

    </div>
</template>

<script>
    import CardHolder from "./CardHolder";
    import NavBar from "./NavBar";
    import {getDevicesByHomeAndType} from "../assets/js/lib";


    export default {
        name: "ViewDeviceType",
        components: {CardHolder, NavBar},
        data(){
            return{
                cards: null,
                home: {
                    name: null,
                },
                room: {
                    name: null,
                }
            }
        },
        mounted(){
            getDevicesByHomeAndType(this.$route.params.homeID, this.$route.params.deviceTypeName)
                .then(this.loadCards)
                .catch(console.log);
        },
        methods:{
            loadCards(data){
                if(data.length === 0)
                    this.$router.push({name: "pageNotFound"});
                else {
                    this.home.name = data[0].room.home.name;
                    this.room.name = this.$vuetify.lang.t(`$vuetify.${data[0].type.name}`);
                    this.cards = data;
                }
            }
        },
    }
</script>

<style scoped>

</style>