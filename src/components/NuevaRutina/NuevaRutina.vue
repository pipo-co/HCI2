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
        <v-container class="pa-2">
            <v-row no-gutters class="ma-auto pa-auto">
                <v-col cols="3" md="3" class=" ma-1 pa-0" >
                    <v-btn rounded outlined color="#A5A5A5" @click='controllerBack()' v-show="stepController.value>1">
                        Volver
                    </v-btn>
                </v-col>
                <v-col cols="6" md="6">
                    <v-stepper class="rounded my-4" v-model="stepController.value">
                        <v-stepper-header>
                            <v-stepper-step :complete="stepController.value >1" step="1"></v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step :complete="stepController.value >2" step="2"></v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step :complete="stepController.value >3" step="3"></v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step step="4"></v-stepper-step>
                        </v-stepper-header>
                    </v-stepper>
                </v-col>
                <v-col>
                    <v-btn rounded outlined color="#A5A5A5" @click='controllerNextPlus()' v-show="stepController.value<4">
                        Siguiente
                    </v-btn>
                    <!--<v-btn rounded outlined color="#A5A5A5" :to="{ name: 'homes' }" @click='saveDisp()' v-show="stepController.value===4" :disabled="newdisp.dispname != null">
                        Guardar
                    </v-btn>-->
                </v-col>
            </v-row>
            <v-row>
                <v-card elevation="5" class="mx-auto rounded"
                        width="750"
                        height="280"
                >
                    <v-container fluid >
                        <v-row no-gutters>
                            <v-col cols="1" >
                                <v-list-item-avatar color="primary" height="60" width="60" class="ma-1 white--text">{{stepController.value}}</v-list-item-avatar>
                            </v-col>
                            <v-col>
                                <v-container fluid class="pa-0">
                                    <v-row no-gutters class="ma-0 pa-0" align="top">
                                        <v-col cols="2">
                                            <v-list class="ml-3">
                                                <v-list-item-subtitle class="headline " align="left">Titulo:</v-list-item-subtitle>
                                            </v-list>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="newRoutine.dispname" class="pa-0 my-0"  ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters class="ma-0 pa-0">
                                        <v-col cols="2">
                                            <v-list class="ml-3" >
                                                <v-list-item-subtitle  align="left">Descripcion:</v-list-item-subtitle>
                                            </v-list>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="newRoutine.desc" class="pa-0" height="25" ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-col>
                        </v-row>
                                <!--<v-list class="ml-3">
                                    <v-list-item-title class="headline " align="left">Titulo:</v-list-item-title>
                                    <v-list-item-subtitle align="left" class="ml-1">Descripcion:</v-list-item-subtitle>
                                </v-list>
                            </v-col>
                            <v-col>
                                <v-list class="ml-3 pa-0">
                                        <v-text-field v-model="newRoutine.dispname" class="pa-0 my-0" height="28" ></v-text-field>
                                        <v-text-field v-model="newRoutine.desc" class="pa-0" height="18" ></v-text-field>
                                </v-list>
                            </v-col>
                        </v-row>-->
                    </v-container>
                    <v-container class="py-0 my-0">
                        <v-row class="py-0 my-0">
                            <v-col cols="4" md="4" class="pa-0 my-0" >
                                <v-list-item class="py-0 my-0">
                                    <v-list-item-content class="py-0 my-0">
                                        <v-list-item-title class="pa-0 md-0"> Dispositivos agregados: </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                        </v-row>
                        <v-container class="py-0 my-0">
                            <v-row>
                                <v-col cols="6" md="6">
                                    <v-btn height="70" width="350"  class="md-12 text--secondary border-dashed" outlined>
                                        <v-icon large dark outlined>mdi-plus</v-icon>
                                        Agregar Dispositivo
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-container>
                </v-card>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    //import Api from "@/assets/js/Api.js";
    //import {createDeviceFromScratch, getRoomsFromHome} from "../../assets/js/lib";
    // const lib = require('../../assets/js/lib.js')
    //import {getRoomsFromHome} from "../../assets/js/lib";

    export default {
        name: "NuevaRutina",
        data() {
            return {
                stepController: {
                    value: 1,
                },
                newRoutine: {
                    home: null,
                    room: null,
                    typeid: null,
                    name: null,
                    desc:null,
                },
            }
        },
        methods: {
            controllerBack() {
                this.stepController.value--;
            },
            controllerNextPlus() {
                this.stepController.value++;
            },
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