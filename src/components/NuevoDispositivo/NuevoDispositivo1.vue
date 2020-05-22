<template>
    <div>
        <v-app-bar fixed color="#72E1C7">
            <v-container fluid>
                <v-row no-gutters>
                    <v-col cols="5">
                        <v-list-item dense>
                            <v-toolbar-title class="headline">SMARTIFY</v-toolbar-title>

                        </v-list-item>
                    </v-col>
                    <v-col cols="4" >
                        <v-list-item dense>
                            <v-toolbar-title class="ml-9">NUEVO DISPOSITIVO</v-toolbar-title>
                        </v-list-item>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
        <v-container class="pa-2">
            <v-row no-gutters class="ma-auto pa-auto">
                <v-col cols="3" md="3" class=" ma-1 pa-0" >
                    <v-btn class="ml-5 rounded"  light outlined text @click="cancelProcess()"> Cancelar</v-btn>
                </v-col>
                <v-col cols="6" md="6">
                    <v-stepper class="rounded my-4" v-model="stepController.value">
                        <v-stepper-header>
                            <v-stepper-step :complete="stepController.value > 1" step="1"></v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step :complete="stepController.value > 2" step="2"></v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step :complete="stepController.value > 3" step="3"></v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step step="4"></v-stepper-step>
                        </v-stepper-header>
                    </v-stepper>
                </v-col>
                <v-col>

                    <v-btn rounded outlined color="#A5A5A5"  @click='saveDisp()' v-show="stepController.value === 4" :disabled="newdisp.dispname === null || validDisp === false">
                        Guardar
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-card class="rounded ma-auto pa-auto" width="600" elevation="3">
                    <v-container fluid v-show="stepController.value === 1">
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
                                            :key="home.id"
                                            :label="home.name"
                                            :value="home"
                                    ></v-radio>
                                    <v-radio label="Crear nuevo Hogar" :value="null"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-row justify="center" v-show="newdisp.home === 0">
                            <v-col cols="9" class="pa-0 ma-0">
                                <v-form
                                        ref="form"
                                        v-model="validHome"
                                        lazy-validation
                                        @submit="controllerNextPlus() && false"
                                >
                                <v-text-field
                                        class="ma-auto"
                                        @click="changeHomeFlag()"
                                        v-model="newhomename"
                                        :rules="newHomeRules"
                                        :error-messages="homeerrormessage"
                                        label="Nombre del nuevo hogar"
                                ></v-text-field>
                                </v-form>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                            </v-col>
                            <v-col cols="6"></v-col>
                            <v-col>
                                <v-btn rounded outlined color="#A5A5A5" @click='controllerNextPlus()'  :disabled="validation">
                                    Siguiente
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container fluid v-show="stepController.value === 2">
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
                                            :key="homeroom.id"
                                            :label="homeroom.name.split('_').pop()"
                                            :value="homeroom"
                                    ></v-radio>
                                    <v-radio :label="`Crear nueva Habitacion`" :value="null"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-row justify="center" v-show="newdisp.room === 0">
                            <v-col cols="9">
                                <v-form
                                        ref="form"
                                        v-model="validRoom"
                                        lazy-validation
                                        @submit="controllerNextPlus() && false"
                                >
                                    <v-text-field
                                            class="ma-auto"
                                            v-model="newroomname"
                                            @click="changeRoomFlag()"
                                            :rules="newRoomRules"
                                            :error-messages="roomerrormessage"
                                            label="Crear nueva Habitacion"
                                    ></v-text-field>
                                </v-form>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn rounded outlined color="#A5A5A5" @click='controllerBack()'>
                                    Volver
                                </v-btn>
                            </v-col>
                            <v-col cols="6"></v-col>
                            <v-col>
                                <v-btn rounded outlined color="#A5A5A5" @click='controllerNextPlus()'  :disabled="validation">
                                    Siguiente
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container fluid v-show="stepController.value === 3">
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
                                            :key="disps.id"
                                            :label="disps.name"
                                            :value="disps.id"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn rounded outlined color="#A5A5A5" @click='controllerBack()'>
                                    Volver
                                </v-btn>
                            </v-col>
                            <v-col cols="6"></v-col>
                            <v-col>
                                <v-btn rounded outlined color="#A5A5A5" @click='controllerNextPlus()'  :disabled="validation">
                                    Siguiente
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container fluid v-show="stepController.value === 4">
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
                                <v-row no-gutters align="baseline">
                                    <v-col cols="4" >
                                        <v-list-item class="pa-1 mt-1">
                                            <v-list-item-content class="ml-1 my-0 md-0">
                                                <v-list-item-title class="pt-2 px-1 md-0" align="left"> Nombre del dispositivo: </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-container fluid class="pa-0">
                                            <v-row no-gutters wrap >
                                                <v-col cols="12" md="12">
                                                    <v-form
                                                            ref="form"
                                                            v-model="validDisp"
                                                            lazy-validation
                                                            @submit="saveDisp() && false"
                                                    >
                                                        <v-text-field
                                                                v-model="newdisp.dispname"
                                                                :rules="newDispRules"
                                                                @click="changeDispFlag()"
                                                                :error-messages="disperrormessage"
                                                                class="py-0 pr-2" height="25" ></v-text-field>
                                                    </v-form>
                                                </v-col>
                                                <v-col cols="12" md="12">
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
    import {
        createDevice,
        createDeviceFromNotExistingRoom,
        createDeviceFromScratch,
    } from "../../assets/js/lib";
    import Home from "../../assets/js/Home";
    import Room from "../../assets/js/Room";
    // const lib = require('../../assets/js/lib.js')
    export default {
        name: "NuevoDispositivo1",
        data() {
            return {
                routeHomeID:null,
                routeRoomID:null,
                validHome: false,
                validRoom: false,
                validDisp: false,
                homes: null,
                disptypes: null,
                rooms: null,
                disps: null,
                stepController: {
                    value: 1,
                },
                newHomeRules: [
                    v => !!v || 'Es necesario un nombre',
                    v => (v && v.length >= 3 && v.length <= 60) || 'El nombre debe tener entre 3 y 60 caracteres',
                    v => /^[A-Z a-z0-9]+$/.test(v) || 'El nombre solo puede contener letras, numeros o espacios',
                ],
                newRoomRules: [
                    v => !!v || 'Es necesario un nombre',
                    v => (v && v.length >= 3 && v.length <= 43) || 'El nombre debe tener entre 3 y 43 caracteres',
                    v => /^[A-Z a-z0-9]+$/.test(v) || 'El nombre solo puede contener letras, numeros o espacios',
                ],
                newDispRules: [
                    v => !!v || 'Es necesario un nombre',
                    v => (v && v.length >= 3 && v.length <= 26) || 'El nombre debe tener entre 3 y 26 caracteres',
                    v => /^[A-Z a-z0-9]+$/.test(v) || 'El nombre solo puede contener letras, numeros o espacios',
                ],
                newdisp: {
                    home: null,
                    room: null,
                    typeid: null,
                    dispname: null,
                },
                flagErrorHome: false,
                flagErrorRoom: false,
                flagErrorDisp: false,
                newhomename: null,
                newroomname: null,
            }
        },
        mounted() {
            this.routeHomeID = this.$route.params.homeID ;
            this.routeRoomID = this.$route.params.roomID;
            Api.home.getAll()
                .then(data => {
                    this.homes = data.result
                    if (this.routeHomeID !== undefined)
                        this.homes.forEach(elem => {
                            if (elem.id === this.routeHomeID)
                                this.newdisp.home = elem;
                        });
                })
                .catch(error => console.log(`Error ${error}`));

            Api.deviceType.getAll()
                .then(data => this.disptypes = data.result)
                .catch(error => console.log(`Error ${error}`));

            if (this.routeHomeID !== undefined && this.routeRoomID !== undefined) {
                this.stepController.value = 3;
                this.getRooms(this.routeHomeID);
            }
        },
        computed: {
            validation() {
                if (this.stepController.value === 1)
                    return (
                        (this.newdisp.home === null && this.newhomename === null) ||
                        this.newdisp.home === 0 && (this.newhomename === '' || this.newhomename === null || !this.validHome)
                    );

                else if (this.stepController.value === 2)
                    return (
                        (this.newdisp.room === null && this.newroomname === null) ||
                        (this.newdisp.room === 0 && (this.newroomname === '' || this.newroomname === null || !this.validRoom))
                    );

                else if (this.stepController.value === 3)
                    return (this.newdisp.typeid === null)

                else
                    return true;
            },
            route() {
                /*//eslint-disable-next-line no-debugger
                debugger;*/
                console.log(this.$route.params.previousRoute);
                if (this.$route.params.previousRoute === 'room') {
                    return {
                        name: this.$route.params.previousRoute,
                        params: {'homeID': this.routeHomeID, 'roomID': this.routeRoomID}
                    };
                } else
                    return {name: 'homes'};

            },
            homeerrormessage() {
                if (this.flagErrorHome) {
                    return 'El nombre del hogar ya existe, por favor elija otro nombre';
                } else
                    return null;
            },
            roomerrormessage() {
                if (this.flagErrorRoom) {
                    return 'El nombre de la habitacion ya existe, por favor elija otro nombre';
                } else
                    return null;
            },
            disperrormessage() {
                if (this.flagErrorDisp) {
                    return 'El nombre del dispositivo ya existe, por favor elija otro nombre';
                } else
                    return null;
            }
        },
        methods: {
            changeHomeFlag() {
                this.flagErrorHome = false;
            },
            changeRoomFlag() {
                this.flagErrorRoom = false;
            },
            changeDispFlag() {
                this.flagErrorDisp = false;
            },
            controllerBack() {
                this.stepController.value--;
            },
            getRooms(id) {

                Api.home.getHomeRooms(id)
                    .then(data => {
                        this.rooms = data.result
                        if (id !== undefined) {
                            this.rooms.forEach(elem => {
                                console.log(id);
                                if (elem.id === this.routeRoomID)
                                    this.newdisp.room = elem;
                            })
                        }
                    }).catch(error => console.log(`Error ${error}`));
            },
            controllerNextPlus() {
                if (!this.validation) {
                    if (this.stepController.value === 1) {
                        if (this.newdisp.home === null || this.newdisp.home === 0) {
                            if (this.homes !== null && this.homes.some(elem => elem.name === this.newhomename)) {
                                this.flagErrorHome = true;
                            } else {
                                this.flagErrorHome = false;
                                this.stepController.value++;
                            }
                        } else if (this.newdisp.home != null && this.newdisp.home !== 0) {
                            this.getRooms(this.newdisp.home.id)
                            this.stepController.value++;
                        }
                    } else if (this.stepController.value === 2) {
                        if (this.newdisp.room === 0) {
                            if (this.rooms != null && this.rooms.some(elem => elem.name === `${this.newdisp.home.id}_${this.newroomname}`)) {
                                this.flagErrorRoom = true;
                            } else {
                                this.flagErrorHome = false;
                                this.stepController.value++;
                            }
                        } else
                            this.stepController.value++;
                    } else {
                        if (this.newdisp.room !== null && this.newdisp.room !== 0) {
                            Api.room.getRoomDevices(this.newdisp.room.id)
                                .then(data => this.disps = data.result)
                                .catch(error => console.log(`Error ${error}`));
                            this.stepController.value++;
                        } else
                            this.stepController.value++;
                    }
                }
            },
            saveDisp() {
                //eslint-disable-next-line no-debugger
                debugger;
                if (this.newdisp.room !== 0 && this.disps != null && this.disps.some(elem => elem.name === `${this.newdisp.home.id}_${this.newdisp.room.id}_${this.newdisp.dispname}`)) {
                    this.flagErrorDisp = true;
                } else if (this.newdisp.home === 0) {
                    createDeviceFromScratch(this.newhomename, this.newroomname, this.newdisp.dispname, this.newdisp.typeid)
                        .then(() => this.$router.push(this.route))
                        .catch(error => console.log(`Error ${error}`));
                } else if (this.newdisp.room === 0) {
                    createDeviceFromNotExistingRoom(new Home(this.newdisp.home.id, this.newdisp.home.name, this.newdisp.home.meta), this.newroomname, this.newdisp.dispname, this.newdisp.typeid)
                        .then(() => this.$router.push(this.route))
                        .catch(error => console.log(`Error ${error}`));
                } else {
                    createDevice(this.newdisp.dispname, this.newdisp.typeid, new Room(this.newdisp.room.id, this.newdisp.room.name, this.newdisp.room.meta, this.newdisp.home))
                        .then(() => this.$router.push(this.route))
                        .catch(error => console.log(`Error ${error}`));
                }
            },
            cancelProcess() {
                this.$router.push(this.route);
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