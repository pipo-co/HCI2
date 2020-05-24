<template>
    <div>
        <nav-bar :show-back="true"></nav-bar>
        <v-dialog v-model="loadingPage" hide-overlay persistent width="30%">
            <v-card color="primary" dark>
                <v-card-text>
                    Cargando historial de acciones. Por favor espere :D
                    <v-progress-linear indeterminate color="white" class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-container >
            <v-row v-if="!loadingPage" justify="center" :id="`#${device.id}`">
                <v-col cols="8">
                    <v-card shaped>
                        <v-container>
                            <v-row>
                                <v-col cols="12" class="py-0">
                                    <v-container fluid class="py-0 px-0">
                                        <v-row align="center">
                                            <v-col class="py-0 px-0" order="start" cols="1">
                                                <v-avatar :color="iconInfo.bgColor">
                                                    <v-icon :color="iconInfo.color">{{iconInfo.src}}</v-icon>
                                                </v-avatar>
                                            </v-col>
                                            <v-col class="py-0">
                                                <v-list class="mx-auto">
                                                    <v-list-item-group>
                                                        <v-list-item-content class="py-0">
                                                            <v-list-item-subtitle>{{location}}</v-list-item-subtitle>
                                                            <v-list-item-title class="title d-inline-block text-truncate text--darken-1 indigo--text">{{device.getName()}}</v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item-group>
                                                </v-list>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-col>
                                <v-col cols="12" class="align-baseline py-0">
                                    <v-container  class="py-0">
                                        <v-row align="baseline">
                                            <v-col class="py-0"  order="start">
                                                <v-card-title>
                                                    Historial de acciones
                                                </v-card-title>
                                            </v-col>
                                            <v-col order="end">
                                                <v-text-field
                                                        class="px-auto"
                                                        v-model="search"
                                                        append-icon="mdi-magnify"
                                                        label="Buscar"
                                                        single-line
                                                        hide-details
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-col>
                                <v-col cols="12">
                                    <v-data-table
                                            :headers="headers"
                                            :items="logs"
                                            :search="search"
                                    ></v-data-table>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>

</template>

<script>
    import Api from "../assets/js/Api";
    import Device from "../assets/js/Device";
    import NavBar from "./NavBar";
    import {getIconInfo} from "../assets/js/lib"
    import {getLocation} from "../assets/js/DevicesLib";
    //let moment = require('moment');

    export default {
        name: "deviceLog",
        components: {NavBar},
        data(){
            return{
                device: null,
                logs: null,
                iconInfo: null,
                location: null,
                loadingPage: true,
                search: null,
                headers: [
                    {
                        text: 'Fecha',
                        align: 'start',
                        value: 'timestamp',
                    },
                    { text: 'Accion', value: 'action' },
                    { text: 'Parametros', value: 'params' },
                ],
                blacklistActions: [
                    'getPlaylist'
                ]
            }
        },
        mounted() {
            if(!this.$route.params.deviceId)
                this.$router.push({name: "pageNotFound"});

            Api.device.get(this.$route.params.deviceId)
                .then( data => {
                    this.device = new Device(data.result.id, data.result.name, data.result.type, data.result.meta, data.result.state, data.result.room);
                    this.iconInfo = getIconInfo(this.device.type.name);
                    this.location = getLocation(this.device);
                    this.device.getLogs()
                        .then( data => {
                            this.logs = data.result.filter( log => log.result && ! this.blacklistActions.includes(log.action));
                            this.logs.forEach(log => {
                                log.timestamp = new Date(log.timestamp).toLocaleString()
                                log.action = this.$vuetify.lang.t(`$vuetify.${log.action}`)
                                if(log.params.length !== 0){
                                    let aux = this.$vuetify.lang.t(`$vuetify.${log.params}`)
                                    if( ! aux.includes("$vuetify"))
                                        log.params = aux;
                                }
                            })
                        })
                        .catch(console.log)
                        .finally( () => this.loadingPage = false);
                })
                .catch( (error) => {
                    if(error.code === 1)
                        this.$router.push({name: "pageNotFound"});
                    console.log(error.description);
                });
        }
    }
</script>

<style scoped>
    .v-list-item__content{
        text-align: left;
    }
</style>
