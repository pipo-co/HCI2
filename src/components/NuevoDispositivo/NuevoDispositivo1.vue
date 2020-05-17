<template>
    <div>
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
                    <v-btn rounded outlined color="#A5A5A5" @click='controllerNextPlus()' v-show="stepController.value<4" :disabled="validation">
                        Siguiente
                    </v-btn>
                    <v-btn rounded outlined color="#A5A5A5" :to="{ name: 'homes' }" @click='saveDisp()' v-show="stepController.value===4" :disabled="newdisp.dispname != null">
                        Guardar
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-card class="rounded ma-auto pa-auto" width="600" elevation="3">
                    <v-container fluid v-show="stepController.value===1">
                        <v-row>
                            <v-col cols="1">
                                <v-list-item-avatar color="primary" height="60" width="60" class="white--text">{{stepController.value}}</v-list-item-avatar>
                            </v-col>
                            <v-col>
                                <v-list class="mx-5">
                                    <v-list-item-title class="headline" align="left">Seleccione el hogar</v-list-item-title>
                                    <v-list-item-subtitle align="left">Elegir el hogar al cual va a pertenecer el nuevo dispositivo</v-list-item-subtitle>
                                </v-list>
                            </v-col>
                        </v-row>
                        <v-row >
                            <v-col cols="1"></v-col>
                            <v-col>
                                <v-radio-group v-model="newdisp.home">
                                    <v-radio
                                            v-for="home in homes"
                                            :key="home"
                                            :label="home.name"
                                            :value="home.id"
                                    ></v-radio>
                                    <v-radio :label="`Crear nuevo Hogar`" :value="null"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-row justify="center" v-show="newdisp.home===0">
                            <v-col cols="9" class="pa-0 ma-0">
                                <v-text-field
                                        class="ma-auto"
                                        v-model="newhomename"
                                        label="Nombre del nuevo hogar"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container fluid v-show="stepController.value===2">
                        <v-row>
                            <v-col cols="1">
                                <v-list-item-avatar color="primary" height="60" width="60" class="white--text">{{stepController.value}}</v-list-item-avatar>
                            </v-col>
                            <v-col>
                                <v-list class="mx-5">
                                    <v-list-item-title class="headline" align="left">Seleccionar la habitacion</v-list-item-title>
                                    <v-list-item-subtitle align="left">Elegir la habitacion a la cual va a pertenecer el nuevo dispositivo</v-list-item-subtitle>
                                </v-list>
                            </v-col>
                        </v-row>
                        <v-row >
                            <v-col cols="1"></v-col>
                            <v-col>
                                <v-radio-group v-model="newdisp.room">
                                    <v-radio
                                            v-for="homeroom in rooms"
                                            :key="homeroom"
                                            :label="homeroom.name"
                                            :value="homeroom.id"
                                    ></v-radio>
                                    <v-radio :label="`Crear nueva Habitacion`" :value="null"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-row justify="center" v-show="newdisp.room===0">
                            <v-col cols="9">
                                <v-text-field
                                        class="ma-auto"
                                        v-model="newroomname"
                                        label="Crear nueva Habitacion"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container fluid v-show="stepController.value===3">
                        <v-row>
                            <v-col cols="1">
                                <v-list-item-avatar color="primary" height="60" width="60" class="white--text">{{stepController.value}}</v-list-item-avatar>
                            </v-col>
                            <v-col>
                                <v-list class="mx-5">
                                    <v-list-item-title class="headline" align="left">Seleccionar el tipo de dispositivo</v-list-item-title>
                                    <v-list-item-subtitle align="left">Elegir el tipo de dispositivo que desea agregar</v-list-item-subtitle>
                                </v-list>
                            </v-col>
                        </v-row>
                        <v-row wrap >
                            <v-col cols="1"></v-col>
                            <v-col>
                                <v-radio-group v-model="newdisp.typeid">
                                    <v-radio
                                            v-for="disps in disptypes"
                                            :key="disps"
                                            :label="disps.name"
                                            :value="disps.id"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container fluid v-show="stepController.value===4">
                        <v-row>
                            <v-col cols="1">
                                <v-list-item-avatar color="primary" height="60" width="60" class="white--text">{{stepController.value}}</v-list-item-avatar>
                            </v-col>
                            <v-col>
                                <v-list class="mx-5">
                                    <v-list-item-title class="headline" align="left">Finalizar</v-list-item-title>
                                    <v-list-item-subtitle align="left">Elija el nombre del dispositivo e indique su consumo</v-list-item-subtitle>
                                </v-list>
                            </v-col>
                        </v-row>
                        <v-row >
                            <v-container fluid class="mb-0 pb-0" >
                                <v-row no-gutters>
                                    <v-col cols="4" >
                                        <v-list-item class="pa-1 mt-1">
                                            <v-list-item-content class="ml-1 my-0 md-0">
                                                <v-list-item-title class="pt-2 px-1 md-0" align="left"> Nombre del dispositivo: </v-list-item-title>
                                                <v-list-item-title class="ml-1 pt-2" align="left">Consumo por hora:</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-container fluid class="pa-0">
                                            <v-row no-gutters wrap>
                                                <v-col cols="12" md="12">
                                                    <v-text-field v-model="newdisp.dispname" class="py-0 pr-2" height="40" ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="12">
                                                    <v-text-field v-model="newdisp.consumo"  class="pa-0 ma-0" height="10" placeholder="Consumo en KWH" ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-row>
                    </v-container>
                </v-card>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import Api from "@/assets/js/Api.js";
    import {createDeviceFromScratch, getRoomsFromHome} from "../../assets/js/lib";
    // const lib = require('../../assets/js/lib.js')
    export default {
        name: "NuevoDispositivo1",
        data() {
            return {
                homes: null,
                disptypes:null,
                rooms:null,
                stepController: {
                    value: 1,
                },
                newdisp: {
                    home: null,
                    room: null,
                    typeid: null,
                    dispname: null,
                    consumo:null,
                },
                newhomename: null,
                newroomname: null,
            }
        },
        mounted() {
            Api.home.getAll().then(data => {
                this.homes = data.result;
            }).catch(error => {
                console.log(`Error ${error}`);
            });
            Api.deviceType.getAll().then(data => {
                this.disptypes = data.result;
            }).catch(error => {
                console.log(`Error ${error}`);
            });

        },
        computed : {
            validation() {
                if(this.stepController.value === 1)
                    return (this.newdisp.home === null && this.newhomename === null || this.newdisp.home !== 0 && this.newhomename !== null && this.newhomename !== '' || this.newdisp.home === 0 && ( this.newhomename === '' || this.newhomename === null));
                else if (this.stepController.value === 2)
                    return (this.newdisp.room === null && this.newroomname === null || this.newdisp.room !== 0 && this.newroomname !== null && this.newroomname !== '' || this.newdisp.room === 0 && ( this.newroomname === '' || this.newroomname === null));
                else if (this.stepController.value === 3)
                    return (this.newdisp.typeid===null)
                else
                    return true;
            },
        },
        methods: {
            controllerBack() {
                this.stepController.value--;
            },
            controllerNextPlus() {
                this.stepController.value++;
                if (this.newdisp.home != null)
                    getRoomsFromHome(this.newdisp.home)
                        .then(data => this.rooms = data)
                        .catch(error => console.log(`Error ${error}`));
            },
            saveDisp(){
                if(this.newdisp.home===0)
                    createDeviceFromScratch(this.newhomename, this.newroomname,this.newdisp.dispname, this.newdisp.typeid);
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