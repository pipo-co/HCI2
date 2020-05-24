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
                    <v-btn rounded outlined color="#A5A5A5" @click='saveNewRoutine()' :disabled="!validRoutine">
                        Guardar
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-card elevation="5" class="mx-auto rounded"
                        width="800"
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
                                                        :rules="newRoutine.titleRules"
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
                                                        :rules="newRoutine.descRules"
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
                                        <v-list-item-title class="pa-0 md-0"> Acciones agregados: </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                        </v-row>
                        <v-row no-gutters wrap>
                            <v-col v-for="(action, i) in newRoutine.actions" :key="i">
                                <v-card class="rounded my-4" elevation="3" width="350">
                                    <v-container fluid>
                                        <v-row no-gutters align="center">
                                            <v-col cols="1">
                                                <v-list-item-avatar :color="getIconInfo(action.typeName).bgColor" >
                                                    <v-icon large :color="getIconInfo(action.typeName).color">{{getIconInfo(action.typeName).src}}</v-icon>
                                                </v-list-item-avatar>
                                            </v-col>
                                            <v-col>
                                                <v-list class="mx-5">
                                                    <v-list-item-title class="headline" align="left">{{action.deviceName}}</v-list-item-title>
                                                    <v-list-item-subtitle align="left">{{action.homeName}}-{{action.roomName}}</v-list-item-subtitle>
                                                </v-list>
                                            </v-col>
                                            <v-col></v-col>
                                            <v-col cols="2">
                                                <v-btn @click="removeAction(i)" text top fab>
                                                    <v-icon>mdi-close</v-icon>
                                                </v-btn>
                                            </v-col >
                                        </v-row>
                                        <v-row no-gutters>
                                            <v-col cols="7">
                                                <v-list>
                                                    <v-list-item>
                                                        <v-list-item-title>Accion: {{action.action.actionName}}</v-list-item-title>
                                                    </v-list-item>
                                                </v-list>
                                            </v-col>
                                            <v-col v-if="action.action.actionName === 'setLocation'">
                                                <v-list>
                                                    <v-list-item>
                                                        <v-list-item-title>{{action.setLocationRoom}}</v-list-item-title>
                                                    </v-list-item>
                                                </v-list>
                                            </v-col>
                                            <v-col v-else-if="action.action.actionName === 'setColor'">
                                                <v-list>
                                                    <v-list-item>
                                                        <v-avatar size="16" :color="`#${action.action.params[0]}`"></v-avatar>
                                                    </v-list-item>
                                                </v-list>
                                            </v-col>
                                            <v-col v-else v-for="(param, index) in action.action.params" :key="index">
                                                <v-list>
                                                    <v-list-item>
                                                        <v-list-item-title>{{param}}</v-list-item-title>
                                                    </v-list-item>
                                                </v-list>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card>
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
                                                    height="900"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <v-btn height="70" width="450" v-on="on" class="md-12 text--secondary border-dashed" outlined>
                                                        <v-icon large dark outlined>mdi-plus</v-icon>
                                                        Agregar Accion
                                                    </v-btn>
                                                </template>
                                                <v-card class="rounded ma-auto"
                                                        height="700">
                                                    <v-container fluid>
                                                        <v-row >
                                                            <v-card class="rounded mx-auto"
                                                                    elevation="4"
                                                                    width="700">
                                                                <v-container fluid class="pa-0">
                                                                    <v-row no-gutters>
                                                                        <v-col cols="8">
                                                                            <v-list>
                                                                                <v-list-item>
                                                                                    <v-list-item-title>Seleccione el hogar del dispositivo:</v-list-item-title>
                                                                                </v-list-item>
                                                                            </v-list>
                                                                        </v-col>
                                                                        <v-col>
                                                                            <v-select
                                                                                    class="mt-3 mr-3"
                                                                                    v-model="home"
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
                                                                    width="700">
                                                                <v-container fluid class="pa-0">
                                                                    <v-row no-gutters>
                                                                        <v-col cols="8">
                                                                            <v-list>
                                                                                <v-list-item>
                                                                                    <v-list-item-title>Seleccione la habitacion del dispositivo:</v-list-item-title>
                                                                                </v-list-item>
                                                                            </v-list>
                                                                        </v-col>
                                                                        <v-col>
                                                                            <v-select
                                                                                    class="mt-3 mr-3"
                                                                                    v-model="room"
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
                                                                    width="700">
                                                                <v-container fluid class="pa-0">
                                                                    <v-row no-gutters>
                                                                        <v-col cols="8">
                                                                            <v-list>
                                                                                <v-list-item>
                                                                                    <v-list-item-title>Seleccione el dispositivo:</v-list-item-title>
                                                                                </v-list-item>
                                                                            </v-list>
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
                                                                    width="700">
                                                                <v-container fluid class="pa-0">
                                                                    <v-row no-gutters >
                                                                        <v-col cols="8">
                                                                            <v-list>
                                                                                <v-list-item>
                                                                                    <v-list-item-title>Seleccione la accion del dispositivo:</v-list-item-title>
                                                                                </v-list-item>
                                                                            </v-list>
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
                                                                    width="700">
                                                                <action-router v-for="(param, i) in action.params" :key="param.name" :actionName="action.name" :rooms="roomItems" :params="param" @change="paramControl($event, i)"/>
                                                            </v-card>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col>
                                                                <v-btn
                                                                        @click="saveAction"
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
    import ActionRouter from "./ActionRouter";
    import {
        createRoutine,
        getActionsItemsArray, getDeviceItemsArray,
        getHomeItemsArray, getIconInfo,
        getRoomItemsArray,
        getRoomsAndDeviceTypesMapFromHome
    } from "../../assets/js/lib";
    import Action from "../../assets/js/Action";
    import Api from "../../assets/js/Api";

    export default {
        name: "NuevaRutina",
        components: {ActionRouter},
        data() {
            return {
                homeItems: [],
                home: null,
                roomItems: [],
                room: null,
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
                    titleRules: [
                        v => !!v || 'Es necesario un titulo',
                        v => (v && v.length >= 3 && v.length <= 60) || 'El nombre debe tener entre 3 y 60 caracteres',
                        v => /^[A-Z a-z0-9]+$/.test(v) || 'El nombre solo puede contener letras, numeros o espacios',
                    ],
                    descRules: [
                        v => (!v || v.length <= 80) || 'La descripcion debe tener como maximo 80 caracteres',
                        v => !v || /^[A-Z a-z0-9]+$/.test(v) || 'La descripcion solo puede contener letras, numeros o espacios'
                    ]
                },
            }
        },
        mounted() {
            getHomeItemsArray().then( data => {
                this.homeItems = data;
            }).catch(error => {
                console.log(`Error ${error}`)});
        },
        computed: {
            validRoutine(){
                return this.newRoutine.nameValid && this.newRoutine.descValid && this.newRoutine.actions.length !== 0;
            }
        },
        methods: {
            paramControl(value, index){
                this.params[index] = value;
                this.checkValidSave();
            },
            saveAction(){
                if(this.isValidState()) {
                    let params = (this.hasParams)? this.params : [];
                    let action = new Action(this.dispositive.id, this.action.name, params);

                    let displayAction = {
                        typeName: this.dispositive.type.name,
                        deviceName: this.dispositive.name.split("_").pop(),
                        roomName: this.room.name,
                        homeName: this.home.name,
                        action: action
                    };

                    // Guardo el nombre de la habitacion elegida. Caso especial setLocation (parche)
                    if(action.actionName === 'setLocation') {
                        Api.room.get(params[0])
                            .then( data => {
                                displayAction.setLocationRoom = data.result.name.split('_').pop();
                                this.newRoutine.actions.push(displayAction);
                                this.dialog = false;
                                this.resetActionForm();
                            })
                            .catch(console.log);
                        return;
                    }


                    this.newRoutine.actions.push(displayAction);
                    this.dialog = false;

                    this.resetActionForm();
                }
            },
            removeAction(index){
                this.newRoutine.actions.splice(index, 1);
            },
            saveNewRoutine() {
                if(this.validRoutine){
                    let desc = (this.newRoutine.desc)? this.newRoutine.desc : "";
                    let actions = this.newRoutine.actions.map(elem => elem.action);
                    createRoutine(this.newRoutine.name, actions, desc)
                        .then( () => this.$router.push({name: 'rutinas'}))
                        .catch(console.log);
                }
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
                getActionsItemsArray(dispType).then( data => {
                    data.forEach(entry => entry.text = this.$vuetify.lang.t(`$vuetify.${entry.text}`));
                    this.actItems = data;
                }).catch(error => {
                    console.log(`Error ${error}`)});
            },
            changeRoomMap() {
                getRoomsAndDeviceTypesMapFromHome(this.room).then(data => {
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
                this.addRoomFlag = false;
                this.getRoomItems(this.home.id);
            },
            roomControl(){
                this.roomReset();
                this.addDispFlag = false;
                this.getDispsItems(this.room.id);
            },
            dispControl(){
                this.dispReset();
                this.addActFlag = false;
                this.getActItems(this.dispositive.type.id);
            },
            actionControl(){
                this.addFlag = false;
                if(this.action.params.length !== 0){
                    this.hasParams = true;
                    this.paramsSetUp();
                } else
                    this.hasParams = false;
                this.checkValidSave();
            },
            paramsSetUp(){
                this.params = [];
                this.action.params.forEach(() => this.params.push(null));
            },
            checkValidSave(){
                this.validSave = this.isValidState();
            },
            isValidState(){
                return !this.addFlag && (!this.hasParams || (this.params && this.params.every(elem => elem)));
            },
            resetActionForm(){
                this.home = null;
                this.roomItems = [];
                this.room = null;
                this.dispItems = [];
                this.dispositive = null;
                this.action = null;
                this.actItems = [];
                this.addHomeFlag = false;
                this.addRoomFlag = true;
                this.addDispFlag = true;
                this.addActFlag = true;
                this.addFlag = true;
                this.validSave = false;
                this.hasParams = false;
                this.params = null;
            },
            getIconInfo(deviceName){
                return getIconInfo(deviceName);
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