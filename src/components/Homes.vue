<template>
    <div>
        <nav-bar/>
        <fab></fab>
        <div v-if="homes && !loading">
            <v-container class="pa-2">
                <v-row no-gutters class=" ma-1 pa-0">
                    <v-col cols="12" md="12">
                        <v-dialog v-model="dialog" width="500">
                            <template v-slot:activator="{ on }">
                                <v-btn color="#72E1C7" class="teal--text text--darken-4 font-weight-bold" dark v-on="on">
                                    Editar Hogares
                                </v-btn>
                            </template>
                            <v-card class="rounded">
                                <v-container fluid>
                                    <v-row no-gutters align="center" v-for="home in homes" :key="home.name">
                                        <v-col cols="1">
                                        </v-col>
                                        <v-col>
                                            <v-form
                                                    ref="form"
                                                    v-model="auxHome[home.id].valid"
                                                    lazy-validation
                                            >
                                                <v-text-field
                                                        v-model="auxHome[home.id].name"
                                                        :label="home.name"
                                                        :error-messages="homeerrormessage(auxHome[home.id].flagErrorHome)"
                                                        :rules="newHomeRules"
                                                        @click="auxHome[home.id].flagErrorHome = false"
                                                        @keydown.enter.prevent="saveChanges"
                                                ></v-text-field>
                                            </v-form>
                                        </v-col>
                                        <v-col cols="1"></v-col>
                                        <v-col >
                                            <v-btn class="ma-auto"
                                                   color="red"
                                                   dark
                                                   @click="eliminateHome(home.name, home.id)">
                                                Eliminar Hogar
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                <v-card-actions>
                                    <v-btn
                                            class="ma-auto"
                                            color="#65C2AD"
                                            dark
                                            @click='saveChanges()'
                                    >
                                        Guardar cambios
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-dialog v-model="dialog2" max-width="500">
                            <v-alert class="my-0 pa-0" border="top" colored-border color="red">
                                <v-card-text class="pb-0 display-1">Eliminar Hogar</v-card-text>
                                <v-card-text>
                                    Si elimina el hogar, se perderán todas las habitaciones y dispositivos en ellas.
                                </v-card-text>
                                <v-card-text>¿Está seguro que quiere eliminar el Hogar: {{this.auxiliarName}} ?</v-card-text>
                                <v-card tile class="blue-grey lighten-5">
                                    <v-card-actions>
                                        <v-btn depressed color="white"  @click=" dialog2 = false">
                                            Cancelar
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                        <v-btn color="error"  @click="deleteThisHome()">
                                            Eliminar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-alert>
                        </v-dialog>
                    </v-col>
                </v-row>
            </v-container>
            <v-card elevation="5" class="mx-auto rounded"
                    width="800"
                    height="1100"
            >
                <v-container class="py-0 my-0">
                    <v-row class="py-0 my-0">
                        <v-tabs class="top-rounded"
                                fixed-tabs
                                v-model="currentHomeindex"
                                background-color="#72E1C7"
                                dark
                        >
                            <v-tabs-slider color="teal"></v-tabs-slider>
                            <v-tab class="teal--text text--darken-4 font-weight-bold" v-for="home in homes" :key="home.id" >
                                {{home.name}}
                            </v-tab>
                        </v-tabs>
                    </v-row>
                    <v-row class="py-2 my-1" >
                        <v-col cols="12" md="12" >
                            <h1 class="headline ma-0 pa-0 text-center">Tipos de dispositivos</h1>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-card elevation="3" class="mx-auto rounded"
                                width="700"
                                height="150"
                        >
                            <v-container fluid>
                                <v-carousel
                                        hide-delimiters
                                        :show-arrows="homedevs && (homedevs.length - 1) / 6 >= 1"
                                        show-arrows-on-hover
                                        continuous
                                        height="150"
                                >
                                    <v-carousel-item v-for="j in 2" :key="j">
                                        <v-row align="center" wrap no-gutters>
                                            <v-col v-for="(dispositive, i) in homedevs" :key="i" cols="4" md="4">
                                                <span v-if="(j === 1)? i < 6: i >= 6">
                                                    <v-hover v-slot:default="{ hover }">
                                                        <v-list-item :key="i" :to="{name: 'deviceType', params: {homeID: currentHome.id , deviceTypeName: dispositive.deviceTypeName}}">
                                                            <v-overlay absolute :opacity=".1" :value="hover"></v-overlay>
                                                            <v-list-item-avatar class="ml-6" :color="dispositive.iconInfo.bgColor" >
                                                                <v-icon large :color="dispositive.iconInfo.color">{{dispositive.iconInfo.src}}</v-icon>
                                                            </v-list-item-avatar>
                                                            <v-list-item-content>
                                                                <v-list-item-title class="headline black--text pt-1 pb-2 ">{{ $vuetify.lang.t(`$vuetify.${dispositive.deviceTypeName}`)}}</v-list-item-title>
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                    </v-hover>
                                                </span>
                                            </v-col>
                                        </v-row>
                                    </v-carousel-item>
                                </v-carousel>
                            </v-container>
                        </v-card>

                    </v-row>
                    <v-row class="py-2 my-1">
                        <v-col cols="12" md="12" >
                            <h1 class="headline ma-0 pa-0 text-center">Habitaciones</h1>
                        </v-col>
                    </v-row>

                <v-row v-for="room in roomMap" :key="room.roomName" class="my-4 rounded">
                    <v-card flat elevation="4"
                            class="ma-auto rounded"
                            width="750"
                            @click="$router.push({ name: 'room', params: { 'homeID' : currentHome.id ,'roomID': room.id }})"
                    >
                        <v-container fluid class="py-0">
                            <v-row align="center" no-gutters>
                                <v-col cols="1">
                                    <v-menu offset-y
                                            transition="slide-y-transition"
                                            bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-btn text top fab
                                                   v-on="on"
                                                   @click="auxRoomId = room.id">
                                                <v-icon>mdi-dots-vertical</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item>
                                            <v-dialog
                                                    v-model="roomEditDialog"
                                                    width="500"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <v-btn
                                                            text
                                                            v-on="on"
                                                            @click="roomName = ''"
                                                    >
                                                        Editar
                                                    </v-btn>
                                                </template>
                                                <v-card class="rounded">
                                                    <v-container fluid>
                                                        <v-row no-gutters align="center">
                                                            <v-col cols="1">
                                                            </v-col>
                                                            <v-col>
                                                                <v-form
                                                                        ref="form"
                                                                        v-model="roomNameValid"
                                                                        lazy-validation
                                                                >
                                                                    <v-text-field
                                                                            v-model="roomName"
                                                                            :label="room.roomName.split('_').pop()"
                                                                            :rules="newRoomRules"
                                                                            :error-messages="roomerrormessage(flagErrorRoom)"
                                                                            @keydown.enter.prevent="saveRoomChanges"
                                                                            autofocus
                                                                    >
                                                                    </v-text-field>
                                                                </v-form>
                                                            </v-col>
                                                            <v-col cols="1"></v-col>
                                                            <v-col >
                                                                <v-btn
                                                                        class="ma-auto"
                                                                        color="#65C2AD"
                                                                        dark
                                                                        @click='saveRoomChanges()'
                                                                >
                                                                    Guardar cambios
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </v-container>
                                                </v-card>
                                            </v-dialog>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-dialog v-model="roomEliminateDialog" max-width="500">
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn
                                                                text
                                                                v-on="on"
                                                        >
                                                            Eliminar
                                                        </v-btn>
                                                    </template>
                                                    <v-alert class="my-0 pa-0" border="top" colored-border color="red">
                                                        <v-card-text class="pb-0 display-1">Eliminar Hogar</v-card-text>
                                                        <v-card-text>
                                                            Si elimina la habitación, se borrarán todos los dispositivos en ella.
                                                        </v-card-text>
                                                        <v-card-text>¿Esta seguro que quiere eliminar la habitación: {{room.roomName.split('_').pop()}}?</v-card-text>
                                                        <v-card tile class="blue-grey lighten-5">
                                                            <v-card-actions>
                                                                <v-btn depressed color="white"  @click="roomEliminateDialog = false">
                                                                    Cancelar
                                                                </v-btn>
                                                                <v-spacer></v-spacer>
                                                                <v-btn color="error" @click="deleteCurrentRoom()">
                                                                    Eliminar
                                                                </v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-alert>
                                                </v-dialog>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                                <v-col cols="5">
                                    <v-list-item-content>
                                        <v-list-item-title class="headline black--text">{{room.roomName.split("_").pop()}}</v-list-item-title>
                                    </v-list-item-content>
                                </v-col>
                                <v-spacer></v-spacer>
                                <span v-for="(dispositive, i) in room.deviceTypeArray" :key="i">
                                    <v-col cols="1" v-if="i<3" >
                                        <v-list-item-avatar  class="mx-1" :color="dispositive.iconInfo.bgColor">
                                            <v-icon large :color="dispositive.iconInfo.color">{{dispositive.iconInfo.src}}</v-icon>
                                        </v-list-item-avatar>
                                    </v-col>
                                    </span>
                                    <v-col cols="1">
                                        <v-btn text fab right>
                                            <v-icon color="#65C2AD" large class="px-4">mdi-chevron-right</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-row>
                </v-container>
            </v-card>
        </div>
        <div v-else-if="!loading" >
            <h1>Todavía no hay dispositivos registrados.</h1>
            <br>
            <h3>Para registrar un nuevo dispositivo, apretar el botón (<v-list-item-avatar color="#72E1C7" class="pa-0 ma-0"><v-icon class="pa-0 ma-0" color="#3C3F58">mdi-plus</v-icon></v-list-item-avatar>) en la parte inferior de la pantalla.</h3>
            <h3>Al hacer click aparecerá un menú. Ahí se debe seleccionar la opción de "Registrar Dispositivo (<v-list-item-avatar color="#white" class="pa-0 ma-0"><v-icon class="pa-0 ma-0" color="#3C3F58">mdi-plus</v-icon></v-list-item-avatar>)"</h3>
        </div>
        <div v-else>
            <p>Cargando...</p>
        </div>
    </div>
</template>

<script>
    import Api from "../assets/js/Api.js";
    import {
        deleteHome, deleteRoom,
        getDeviceTypesInHome,
        getRoomsAndDeviceTypesMapFromHome,
    } from "../assets/js/lib";
    import Home from "../assets/js/Home";
    import Room from "../assets/js/Room";
    import NavBar from "./NavBar";
    import Fab from "./Fab";

    export default {
        name: "Homes",
        components: {Fab, NavBar},
        data() {
            return {
                loading: true,
                dialog: false,
                dialog2:false,
                auxiliarName: false,
                auxHomeName: null,
                auxHomeId: null,
                roomNameValid: false,
                flagErrorRoom: false,
                auxHome: {},
                roomEditDialog: false,
                auxRoomId: null,
                roomName: null,
                roomEliminateDialog: false,
                homes: null,
                currentHomeindex: null,
                currentHome: null,
                homedevs: null,
                roomMap: null,
                newHomeRules:[
                    v=> !!v || 'Es necesario un nombre',
                    v=> (v && v.length >= 3 && v.length <= 60) || 'El nombre debe tener entre 3 y 60 caracteres',
                    v => /^[A-Z a-z0-9]+$/.test(v) || 'El nombre solo puede contener letras, números, \'_\' o espacios',
                ],
                newRoomRules:[
                    v=> !!v || 'Es necesario un nombre',
                    v=> (v && v.length >= 3 && v.length <= 43) || 'El nombre debe tener entre 3 y 43 caracteres',
                    v => /^[A-Z a-z0-9]+$/.test(v) || 'El nombre solo puede contener letras, números o espacios',
                ],
            }
        },
        computed : {
        },
        mounted() {
            this.changeHomes();
        },
        watch: {
            'currentHomeindex'() {
                this.currentHome = this.homes[this.currentHomeindex];
                this.changeHomeDevices();
                this.changeRoomMap();
            },
        },
        methods: {
            changeHomes(){
                Api.home.getAll()
                    .then(data => {
                        if ( !data.result  || data.result.length === 0){
                            this.homes = null;
                            return;
                        }

                        this.homes = data.result;
                        this.currentHome = this.homes[0];
                        this.homes.forEach(elem => {
                            this.auxHome[elem.id] = {name:'', valid:false, flagErrorHome:false};
                        })
                        this.changeHomeDevices();
                        this.changeRoomMap();
                    })
                    .catch(console.log)
                    .finally( () => this.loading = false);
            },
            homeerrormessage(flag) {
                if(flag){
                    return 'El nombre del hogar ya existe, por favor elija otro nombre';
                }
                else
                    return '';
            },
            roomerrormessage(flag) {
                if(flag){
                    return 'El nombre de la habitación ya existe, por favor elija otro nombre';
                }
                else
                    return '';
            },
            eliminateHome(name, id){
                this.dialog2 = true;
                this.auxiliarName= name;
                this.auxHomeId=id;
            },
            changeHomeDevices() {

                getDeviceTypesInHome(this.currentHome.id).then(data => {
                    this.homedevs = data;
                }).catch(console.log);
            },
            changeRoomMap() {
                getRoomsAndDeviceTypesMapFromHome(this.currentHome.id).then(data => {
                    this.roomMap = data;
                }).catch(console.log);
            },
            saveChanges(){
                let flag = false;
                this.homes.forEach(elem =>{
                    let nameaux=this.auxHome[elem.id].name.trim();
                    if(this.auxHome[elem.id].valid && nameaux !=='') {

                        if (this.homes.some(elem => elem.name.toUpperCase().trim() === nameaux.toUpperCase() )) {
                            this.auxHome[elem.id].flagErrorHome = true;
                            flag = true;
                        } else {
                            Home.persistNewName(elem.id, nameaux, {});
                            this.homes.forEach(elem2 => {
                                if(elem2.id === elem.id)
                                    elem2.name = nameaux;
                            } )
                            this.auxHome[elem.id].name = '';
                        }
                    }
                        this.dialog = flag;
                })
            },
            saveRoomChanges(){
                let flag = false;
                if(this.roomNameValid){
                    if(this.roomMap.some(elem => elem.roomName.split('_').pop().toUpperCase().trim() === this.roomName.toUpperCase().trim() )){
                        this.flagErrorRoom = false;
                        flag = true;
                    }
                    else{
                        Room.persistNewName(this.auxRoomId,`${this.currentHome.id}_${this.roomName}`,{});
                        this.roomMap.forEach(elem => {
                            if(elem.id === this.auxRoomId)
                                elem.roomName = this.roomName;
                        } )
                        this.roomName = '';
                    }
                }
                this.roomEditDialog = flag;
            },
            deleteThisHome(){
                deleteHome(this.auxHomeId).then( () => {
                        this.changeHomes();
                    }
                ).catch(console.log);
                this.dialog2 = false;
                this.dialog = false;
            },
            deleteCurrentRoom(){
                deleteRoom(this.auxRoomId, this.currentHome.id, true).then( cascade =>{
                    if(cascade)
                        this.changeHomes();

                    this.changeRoomMap();
                    this.changeHomeDevices();
                    }
                ).catch(console.log);

                this.roomEliminateDialog = false;
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