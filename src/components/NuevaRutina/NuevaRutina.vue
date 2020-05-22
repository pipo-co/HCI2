<template>
    <div>
        <v-app-bar fixed color="#72E1C7">
            <v-container fluid>
                <v-row no-gutters>
                    <v-col cols="5">
                        <v-list-item dense>
                            <v-toolbar-title class="headline">SMARTIFY</v-toolbar-title>
                            <v-btn class="ml-5 rounded" color="red" light outlined text :to="{ name : 'rutinas' }"> Cancelar</v-btn>
                        </v-list-item>
                    </v-col>
                    <v-col cols="4" >
                        <v-list-item dense>
                            <v-toolbar-title class="ml-9">NUEVA RUTINA</v-toolbar-title>
                        </v-list-item>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
        <v-container class="pa-2">
            <v-row no-gutters class="ma-auto pa-auto">
                <v-col cols="3" md="3" class=" ma-1 pa-0" >
                </v-col>
                <v-col cols="6" md="6">
                </v-col>
                <v-col>
                    <v-btn rounded outlined color="#A5A5A5" @click='saveNewRoutine()' :disabled="false">
                        Guardar
                    </v-btn>
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
                                <v-list-item-avatar color="#C6FFAB" height="60" width="60">
                                    <v-icon class="ml-2"  flat color="black" left>mdi-format-list-bulleted</v-icon>
                                </v-list-item-avatar>
                            </v-col>
                            <v-col>
                                <v-container fluid class="pa-0">
                                    <v-row no-gutters>
                                        <v-col cols="2">
                                            <v-list class="ml-3 ">
                                                <v-list-item-subtitle class="headline">Titulo:</v-list-item-subtitle>
                                            </v-list>
                                        </v-col>
                                        <v-col>
                                            <v-form
                                                    ref="form"
                                                    v-model="newRoutine.nameValid"
                                                    lazy-validation
                                                    @submit="false"
                                            >
                                                <v-text-field
                                                        v-model="newRoutine.name"
                                                        :rules="TitleRules"
                                                        class="pa-0 my-0"
                                                ></v-text-field>
                                            </v-form>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters class="ma-0 pa-0">
                                        <v-col cols="2">
                                            <v-list class="ml-3 pa-0" >
                                                <v-list-item-subtitle >Descripcion:</v-list-item-subtitle>
                                            </v-list>
                                        </v-col>
                                        <v-col>
                                            <v-form
                                                    ref="form"
                                                    v-model="newRoutine.descValid"
                                                    lazy-validation
                                                    @submit="false"
                                            >
                                                <v-text-field
                                                        v-model="newRoutine.desc"
                                                        class="pa-0" height="15"
                                                        label="Opcional">
                                                </v-text-field>
                                            </v-form>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-col>
                        </v-row>
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
                        <v-row>
                            <v-col>
                                <v-container class="py-0 my-0">
                                    <v-row>
                                        <v-col cols="6" md="6">
                                            <v-dialog
                                                    v-model="dialog"
                                                    width="1100"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <v-btn height="70" width="350" v-on="on" class="md-12 text--secondary border-dashed" outlined>
                                                        <v-icon large dark outlined>mdi-plus</v-icon>
                                                        Agregar Accion
                                                    </v-btn>
                                                </template>
                                                <v-card class="rounded ma-auto"
                                                        height="600">
                                                    <v-container fluid>
                                                        <v-row >
                                                            <v-card class="rounded mx-auto"
                                                                    elevation="4"
                                                                    width="800">
                                                                <v-container fluid class="pa-0">
                                                                    <v-row no-gutters>
                                                                        <v-col cols="8">
                                                                            <p class="subtitle-1">Seleccione el hogar del dispositivo:</p>
                                                                        </v-col>
                                                                        <v-col>
                                                                            <v-select
                                                                                    class="mt-3 mr-3"
                                                                                    v-model="homeID"
                                                                                    :items="homeItems"
                                                                                    placeholder="Hogares"
                                                                                    solo
                                                                                    @change="homeControl()"
                                                                            ></v-select>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-container>
                                                            </v-card>
                                                        </v-row>
                                                        <v-row >
                                                            <v-card class="rounded mx-auto my-3"
                                                                    elevation="4"
                                                                        width="800">
                                                                <v-container fluid class="pa-0">
                                                                    <v-row no-gutters>
                                                                        <v-col cols="8">
                                                                            <p class="subtitle-1" >Seleccione la habitacion del dispositivo:</p>
                                                                        </v-col>
                                                                        <v-col>
                                                                            <v-select
                                                                                    class="mt-3 mr-3"
                                                                                    v-model="roomID"
                                                                                    :items="roomItems"
                                                                                    placeholder="Habitaciones"
                                                                                    solo
                                                                                    :disabled="addRoomFlag"
                                                                                    @change="roomControl()"
                                                                            ></v-select>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-container>
                                                            </v-card>
                                                        </v-row>
                                                        <v-row >
                                                            <v-card class="rounded mx-auto my-3"
                                                                    elevation="4"
                                                                    width="800">
                                                                <v-container fluid class="pa-0">
                                                                    <v-row no-gutters>
                                                                        <v-col cols="8">
                                                                            <p class="subtitle-1" >Seleccione el dispositivo:</p>
                                                                        </v-col>
                                                                        <v-col>
                                                                            <v-select
                                                                                    class="mt-3 mr-3"
                                                                                    v-model="dispositive"
                                                                                    :items="dispItems"
                                                                                    placeholder="Dispositivos"
                                                                                    solo
                                                                                    :disabled="addDispFlag"
                                                                                    @change="dispControl()"
                                                                            ></v-select>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-container>
                                                            </v-card>
                                                        </v-row>
                                                        <v-row>
                                                            <v-card class="rounded mx-auto my-3"
                                                                    elevation="4"
                                                                    width="800">
                                                                <v-container fluid class="pa-0">
                                                                    <v-row no-gutters>
                                                                        <v-col cols="8">
                                                                            <p class="subtitle-1" >Seleccione la accion del dispositivo:</p>
                                                                        </v-col>
                                                                        <v-col>
                                                                            <v-select
                                                                                    class = "mt-3 mr-3"
                                                                                    v-model="action"
                                                                                    :items="actItems"
                                                                                    placeholder="Acciones"
                                                                                    solo
                                                                                    :disabled="addActFlag"
                                                                                    @change="actionControl"
                                                                            ></v-select>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-container>
                                                            </v-card>
                                                        </v-row>
                                                        <v-row v-if="hasParams">
                                                            <v-card
                                                                    class="rounded mx-auto my-3"
                                                                    elevation="4"
                                                                    width="800">
                                                                <action-router v-for="(param, i) in action.params" :key="param.name" :params="param" @change="paramControl($event, i)"/>
                                                            </v-card>
                                                        </v-row>

                                                        <v-row>
                                                            <v-col>
                                                                <v-btn
                                                                        @click="dialog=false"
                                                                        dark
                                                                        color="#65C2AD"
                                                                        :disabled="!validSave">
                                                                    Agregar Accion
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </v-container>
                                                </v-card>
                                            </v-dialog>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-row>
            <v-row>
                <v-col>

                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    //import Api from "@/assets/js/Api.js";
    //import {createDeviceFromScratch, getRoomsFromHome} from "../../assets/js/lib";
    import ActionRouter from "./ActionRouter";
    // const lib = require('../../assets/js/lib.js')
    //import {getRoomsFromHome} from "../../assets/js/lib";

    //import Api from "../../assets/js/Api";
    import {
        getActionsItemsArray, getDeviceItemsArray,
        getHomeItemsArray,
        getRoomItemsArray,
        getRoomsAndDeviceTypesMapFromHome
    } from "../../assets/js/lib";

    export default {
        name: "NuevaRutina",
        components: {ActionRouter},
        data() {
            return {
                homeItems: null,
                homeID: null,
                roomItems: [],
                roomID: null,
                dispItems: [],
                dispositive: null,
                action: null,
                actItems: [],
                addHomeFlag: false,
                addRoomFlag: true,
                addDispFlag: true,
                addActFlag: true,
                addFlag: true,
                validSave: false,
                hasParams: false,
                params: null,
                dialog: false,
                newRoutine: {
                    actions: [],
                    name: null,
                    nameValid: false,
                    desc: null,
                    descValid: false,
                },
                TitleRules: [
                    v => !!v || 'Es necesario un titulo',
                    v => (v && v.length >= 3 && v.length <= 60) || 'El nombre debe tener entre 3 y 20 caracteres',
                    v => /^[A-Z a-z0-9]+$/.test(v) || 'El nombre solo puede contener letras, numeros o espacios',
                ],
            }
        },
        mounted() {
            getHomeItemsArray().then( data => {
                this.homeItems = data;
            }).catch(error => {
                    console.log(`Error ${error}`)});
        },
        watch: {
        },
        computed: {
        },
        methods: {
            //Esta funcion muestar el resultado del action
            paramControl(value, index){
                this.params[index] = value;
                this.checkValidSave();
            },

            saveNewRoutine() {
                this.stepController.value--;
            },
            getRoomItems(homeID){
                getRoomItemsArray(homeID).then( data => {
                    this.roomItems = data;
                }).catch(error => {
                    console.log(`Error ${error}`)});
            },
            getDispsItems(roomID){
                getDeviceItemsArray(roomID).then( data => {
                    this.dispItems = data;
                }).catch(error => {
                    console.log(`Error ${error}`)});
            },
            getActItems(dispType){
                // eslint-disable-next-line no-debugger
                //debugger;
                getActionsItemsArray(dispType).then( data => {
                    this.actItems = data;
                }).catch(error => {
                    console.log(`Error ${error}`)});
            },
            changeRoomMap() {
                getRoomsAndDeviceTypesMapFromHome(this.roomID).then(data => {
                    this.dispItems = data;
                }).catch(error => {
                    console.log(`Error ${error}`);
                });
            },
            homeReset(){
                this.addRoomFlag=true;
                this.roomReset();
            },
            roomReset(){
                this.addDispFlag=true;
                this.dispReset();
            },
            dispReset(){
                this.addActFlag=true;
                this.hasParams = false;
                this.params = null;
                this.addFlag = true;
                this.checkValidSave();
            },
            homeControl(){
                this.homeReset();
                this.addRoomFlag=false;
                this.getRoomItems(this.homeID);
            },
            roomControl(){
                this.roomReset();
                this.addDispFlag=false;
                this.getDispsItems(this.roomID);
            },
            dispControl(){
                this.dispReset();
                this.addActFlag=false;
                this.getActItems(this.dispositive.type.id);
            },
            actionControl(){
                this.addFlag = false;
                if(this.action.params.length !== 0){
                    this.hasParams = true;
                    this.paramsSetUp();
                }
                this.checkValidSave();
            },
            paramsSetUp(){
                this.params = [];
                this.action.params.forEach(() => this.params.push(null));
            },
            checkValidSave(){
                this.validSave = !this.addFlag && (!this.hasParams || (this.params && this.params.every(elem => elem)));
            }
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