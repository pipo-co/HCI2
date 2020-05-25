<template>
    <v-app-bar fixed color="#72E1C7">
        <v-row align="center" justify="space-between">
            <v-col>
                <v-container fluid>
                    <v-row align="center" justify="start">
                        <v-col cols="1">
                            <go-back v-show="showBack"></go-back>
                        </v-col>
                        <v-col cols="4" >
                            <v-btn @click="$router.push('/')" text>
                                <v-toolbar-title class="headline teal--text text--darken-4 font-weight-bold" color="#3C3F58" to="/">SMARTIFY</v-toolbar-title>
                            </v-btn>
                        </v-col>
                        <v-col cols="3">
                            <v-toolbar-title color="#3C3F58">{{home}}</v-toolbar-title>
                        </v-col>
                        <v-col cols="1">
                            <v-toolbar-title color="#3C3F58" v-show="room">|</v-toolbar-title>
                        </v-col>
                        <v-col cols="3">
                            <v-toolbar-title color="#3C3F58">{{room}}</v-toolbar-title>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
            <v-col align-self="center" order="end">
                <v-form v-show="searchBar.show" v-model="searchBar.valid">
                    <v-text-field
                            class="my-0" background-color="#67CDB3"
                            placeholder="Buscar"
                            autofocus solo flat dense hide-details v-model="searchBar.value"
                            @keydown.enter.prevent="executeSearch">
                        <template v-slot:append>
                            <v-btn dense v-show="searchBar.value" text @click="executeSearch">
                                Buscar
                            </v-btn>
                        </template>
                    </v-text-field>
                </v-form>
            </v-col>
            <v-col cols="1">
                <v-btn icon @click="openSearchBar()">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-col>
            <v-col class="px-0 justify-end" cols="3" order="end">
                <v-tabs right color="#3C3F58" background-color="#72E1C7" optional >
                    <v-tabs-slider color="#87FFE3"></v-tabs-slider>
                    <v-tab class="blue-grey--text text--darken-4 font-weight-bold ml-0" to="/favoritos" >Favoritos</v-tab>
                    <v-tab class="blue-grey--text text--darken-4 font-weight-bold" to="/">Hogares</v-tab>
                    <v-tab class="blue-grey--text text--darken-4 font-weight-bold" to="/rutinas">Rutinas</v-tab>
                </v-tabs>
            </v-col>
        </v-row>
    </v-app-bar>
</template>

<script>
    import GoBack from "./GoBack";
    export default {
        name: "NavBar",
        components: {GoBack},
        props:{
            home:{
                type: String,
                require: false,
            },
            room:{
                type: String,
                require: false,
            },
            showBack: {
                type: Boolean,
                require: false,
                default: false
            }
        },
        data(){
            return{
                searchBar:{
                    show: false,
                    value: null,
                    valid: true,
                }
            }
        },
        methods:{
            openSearchBar(){
                this.searchBar.show = ! this.searchBar.show;
            },
            executeSearch(){
                if(this.searchBar.valid)
                    this.$router.push({'name': 'search', params: {name: this.searchBar.value}})
            }
        }
    }
</script>

<style scoped>

</style>