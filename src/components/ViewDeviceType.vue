<template>
    <div>
        <nav-bar :home="home.name" :room="room.name"/>
    <card-holder :card-array="cards"/>
    </div>
</template>

<script>
    import CardHolder from "./CardHolder";
    import NavBar from "./NavBar";
    const lib = require("../assets/js/lib.js");


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
            lib.getDevicesByHomeAndType(this.$route.params.homeID, this.$route.params.deviceTypeName)
                .then(this.loadCards)
                .catch(error => console.log(`View Device Types ${error}`));
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