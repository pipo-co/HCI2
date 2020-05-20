<template>
    <div>
        <v-app-bar fixed color="#72E1C7">
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
    <v-card v-for="routine in routines" :key="routine.name" elevation="5" class="mx-auto my-2 rounded"
            max-width="750"
            max-height="80"
    >
        <v-container fluid>
            <v-row no-gutters>
                <v-col md="6" >
                    <v-list-item dense>
                        <v-list-item-avatar color="#C6FFAB">
                            <v-icon class="ml-2"  flat color="black" left>mdi-format-list-bulleted</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title align="left" class="headline pt-1 pb-2 ">{{routine.name}}</v-list-item-title>
                            <v-list-item-subtitle align="left" >{{routine.desc}}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>
                <v-col md="6" align-self="center">
                    <v-card-actions right>
                        <v-spacer></v-spacer>
                        <v-btn text>
                            <v-icon outlined color="yellow">mdi-star</v-icon>
                        </v-btn>
                        <v-btn rounded outlined color="primary">Editar</v-btn>
                        <v-btn rounded color="primary" dark right>Ejecutar
                            <v-icon >mdi-play</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
    <v-container fluid>
        <v-row no-gutters>
            <v-col md="3">
                <v-spacer></v-spacer>
            </v-col>
            <v-col align-self="center" justify="center" md="6">
                <v-btn height="70" width="750"  class="ma-auto text--secondary border-dashed rounded" :to="{ name: 'nuevarutina' }"  text>
                    <v-icon large dark>mdi-plus</v-icon>
                    Agregar Rutina
                </v-btn>
            </v-col>
            <v-col md="3">
                <v-spacer></v-spacer>
            </v-col>
        </v-row>
    </v-container>
    </div>
</template>

<script>
    export default {
        name: "Rutinas",
        data() {
            return { routines: [
                    { name: "Modo Dormir", desc: "Apaga las luces y baja las persianas"},
                    { name: "Modo Cine", desc: "Baja las luces y prende el equipo de musica"},
                    { name: "Regar Frente", desc: "Prende aspersores del frente del hogar"},
                    { name: "Refrescar living", desc: "Bajar persianas living y prender el aire en 24"},
                ] }
        }
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