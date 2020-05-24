<template>
    <v-app-bar fixed color="#72E1C7">
        <v-row align="center" justify="space-between">
            <v-col>
                <v-container fluid>
                    <v-row align="center" justify="start">
                        <v-col cols="5" >
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
            <v-spacer/>
            <v-col v-show="searchBar.show" align-self="center">
                <v-form v-model="searchBar.valid">
                    <v-text-field prepend-icon="mdi-magnify" class="my-0" background-color="#67CDB3"
                              autofocus solo flat dense hide-details v-model="searchBar.value"
                              @keydown.enter="executeSearch">
                    <template v-slot:append>
                        <v-btn dense v-show="searchBar.value" text @click="executeSearch">
                            Buscar
                        </v-btn>
                    </template>
                </v-text-field>
                </v-form>
            </v-col>
            <v-col class="px-0 justify-end">
                <v-tabs right color="#3C3F58" background-color="#72E1C7">
                    <v-tabs-slider color="#87FFE3"></v-tabs-slider>
                    <v-tab v-show="! searchBar.show" @click="openSearchBar()">
                        <v-icon right>mdi-magnify</v-icon>
                    </v-tab>
                    <v-tab class="blue-grey--text text--darken-4 font-weight-bold" to="/favoritos" >Favoritos</v-tab>
                    <v-tab class="blue-grey--text text--darken-4 font-weight-bold" to="/">Hogares</v-tab>
                    <v-tab class="blue-grey--text text--darken-4 font-weight-bold" to="/rutinas">Rutinas</v-tab>
                </v-tabs>
            </v-col>
        </v-row>
    </v-app-bar>
</template>

<script>
    export default {
        name: "NavBar",
        props:{
            home:{
                type: String,
                require: false,
            },
            room:{
                type: String,
                require: false,
            },

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