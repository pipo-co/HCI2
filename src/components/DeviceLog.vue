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
                                <v-col cols="12" class="pl-8">
                                    <disp-info :device="device"></disp-info>
                                </v-col>
                                <v-col cols="12" class="align-baseline">
                                    <v-container>
                                        <v-row align="baseline">
                                            <v-col order="start">
                                                <v-card-title>
                                                    Historial de acciones
                                                </v-card-title>
                                            </v-col>
                                            <v-col order="end">
                                                <v-text-field
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
    import DispInfo from "./Dispositivos/DispInfo";
    //let moment = require('moment');

    export default {
        name: "deviceLog",
        components: {DispInfo, NavBar},
        data(){
            return{
                device: null,
                logs: null,
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

                    this.device.getLogs()
                        .then( data => {
                            this.logs = data.result.filter( log => log.result && ! this.blacklistActions.includes(log.action));
                            this.logs.forEach(log => {
                                log.timestamp = new Date(log.timestamp).toLocaleString()
                                log.action = this.$vuetify.lang.t(`$vuetify.${log.action}`)
                                let aux = this.$vuetify.lang.t(`$vuetify.${log.params}`)
                                if( ! aux.includes("$vuetify"))
                                    log.params = aux;
                            })
                        })
                        .catch(console.log)
                        .finally( () => {
                            this.loadingPage = false;
                        });
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

</style>

<!--                <v-col>-->
<!--                    <v-card-text>-->
<!--                        <div>{{`${device.getRoomName()} - ${device.getHomeName()}`}}</div>-->
<!--                        <p class="display-1 text&#45;&#45;primary">-->
<!--                            {{device.getName()}}-->
<!--                        </p>-->
<!--                    </v-card-text>-->
<!--                    <p v-show="noLogs">-->
<!--                        Todavia no has realizado ninguna accion con este dispositivo!!-->
<!--                    </p>-->
<!--                    <v-card-text v-for="log in logs" :key="log.timestamp" v-show="!noLogs">-->
<!--                        <p>{{log.timestamp}}</p>-->
<!--                        <p>{{log.result}}</p>-->
<!--                        <p>{{log.action}}</p>-->
<!--                        <p>Params:</p>-->
<!--                        <p v-for="(param, i) in log.params" :key="i">{{param}}</p>-->
<!--                    </v-card-text>-->
<!--                </v-col>-->
<!--                <v-col v-show="!noLogs">-->
<!--                    <v-pagination-->
<!--                            v-model="currentPage"-->
<!--                            :disabled="awaitingLogs"-->
<!--                            :length="lastPage"-->
<!--                            :next-icon="nextIcon"-->
<!--                            :prev-icon="prevIcon"-->
<!--                            :page="currentPage"-->
<!--                            :total-visible="totalVisible"-->
<!--                            @input="getNewPage"-->
<!--                    ></v-pagination>-->
<!--                </v-col>-->