<template>
    <div>
        <v-container class="pa-2">
            <v-row no-gutters class=" ma-1 pa-0">
                <v-col cols="12" md="12">
                    <v-btn rounded>Editar Hogares</v-btn>
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
                            background-color="#65C2AD"
                            dark
                    >
                        <v-tabs-slider color="black"></v-tabs-slider>
                        <v-tab v-for="home in homes" :key="home.id" >
                            {{home.name}}
                        </v-tab>
                    </v-tabs>
                </v-row>
                <v-row class="py-2 my-1" >
                    <v-col cols="12" md="12" >
                        <h1 class="headline ma-0 pa-0 text-center">Tipos de dispositivo</h1>
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
                                    show-arrows-on-hover
                                    height="150"
                            >
                                <v-carousel-item v-for="j in (0,2)" :key="j">
                                    <v-row align="center" wrap no-gutters>
                                        <v-col v-for="(dispositive, i) in homedevs" :key="i" cols="4" md="4">
                                            <v-list-item :key="i" v-if="(j===1)? i<6: i>=6">
                                                <v-list-item-avatar class="ml-6" :color="dispositive.iconInfo.bgColor" >
                                                    <v-icon large :color="dispositive.iconInfo.color">{{dispositive.iconInfo.src}}</v-icon>
                                                </v-list-item-avatar>
                                                <v-list-item-content>
                                                    <v-list-item-title align="left" class="headline black--text pt-1 pb-2 ">{{dispositive.deviceTypeName}}</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
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
                    >
                        <v-container fluid class="py-0">
                            <v-row align="center" no-gutters>
                                <v-col cols="1">
                                    <v-btn text top fab>
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="5">
                                    <v-list-item-content>
                                        <v-list-item-title align="left" class="headline black--text">{{room.roomName.split("_").pop()}}</v-list-item-title>
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
                                    <v-btn text fab right :to="{ name: 'room', params: { 'roomID': room.id }}">
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
</template>

<script>
    import Api from "@/assets/js/Api.js";
    import {
        getDeviceTypesInHome,
        getRoomsAndDeviceTypesMapFromHome,
        // getRoomsFromHome
    } from "../assets/js/lib";
    //import Home from "../../assets/js/Home";
    //import Room from "../../assets/js/Room";
    export default {
        name: "Homes",
        data() {
            return {
                homes: null,
                currentHomeindex: null,
                currentHome: null,
                homedevs: null,
                roomMap: null,
            }
        },
        mounted() {
            Api.home.getAll().then(data => {
                this.homes = data.result;
                if (this.homes != null)
                    this.currentHome = this.homes[0];
                this.changeRoomMap();
            }).catch(error => {
                console.log(`Error ${error}`);
            });
        },
        watch: {
            'currentHomeindex'() {
                this.currentHome = this.homes[this.currentHomeindex];
                this.changeHomeDevices();
                this.changeRoomMap();
            }
        },
        methods: {
            changeHomeDevices() {
                getDeviceTypesInHome(this.currentHome.id).then(data => {
                    this.homedevs = data;
                }).catch(error => {
                    console.log(`Error ${error}`);
                });
            },
            changeRoomMap() {
                getRoomsAndDeviceTypesMapFromHome(this.currentHome.id).then(data => {
                    this.roomMap = data;
                }).catch(error => {
                    console.log(`Error ${error}`);
                });
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