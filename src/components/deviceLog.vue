<template>
    <v-container>
        <v-row v-if="!loadingPage">
            <v-col>
                <v-card-text>
                    <div>{{`${device.getRoomName()} - ${device.getHomeName()}`}}</div>
                    <p class="display-1 text--primary">
                        {{device.getName()}}
                    </p>
                </v-card-text>
                <p v-show="noLogs">
                    Todavia no has realizado ninguna accion con este dispositivo!!
                </p>
                <v-card-text v-for="log in logs" :key="log.timestamp" v-show="!noLogs">
                    <p>{{log.timestamp}}</p>
                    <p>{{log.result}}</p>
                    <p>{{log.action}}</p>
                    <p>Params:</p>
                    <p v-for="(param, i) in log.params" :key="i">{{param}}</p>
                </v-card-text>
            </v-col>
            <v-col v-show="!noLogs">
                <v-pagination
                        v-model="currentPage"
                        :disabled="awaitingLogs"
                        :length="lastPage"
                        :next-icon="nextIcon"
                        :prev-icon="prevIcon"
                        :page="currentPage"
                        :total-visible="totalVisible"
                        @input="getNewPage"
                ></v-pagination>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Api from "../assets/js/Api";
    import Device from "../assets/js/Device";
    //let moment = require('moment');

    export default {
        name: "deviceLog",
        data(){
            return{
                pageSize: 5,
                totalVisible: 8,
                nextIcon: 'l',
                prevIcon: 'r',
                device: null,
                currentPage: 1,
                lastPage: 1,
                endReached: false,
                logs: null,
                awaitingLogs: false,
                loadingPage: true,
                noLogs: false
            }
        },
        methods: {
            checkLastPage(){
                if(!this.endReached) {
                    this.device.getLogs(this.pageSize, this.lastPage * this.pageSize)
                        .then(data => {
                            if(!(data.result.filter( log => log.result).length === 0))
                                this.lastPage++;
                            else
                                this.endReached = true;
                        })
                        .catch(console.log);
                }

            },
            getNewPage(){
                this.awaitingLogs = true;
                this.device.getLogs(this.pageSize, (this.currentPage - 1) * this.pageSize)
                    .then( data => {
                            this.logs = data.result.filter( log => log.result);
                            if(this.currentPage === this.lastPage)
                                this.checkLastPage();
                    })
                    .catch(console.log)
                    .finally( () => this.awaitingLogs = false);
            }
        },
        mounted() {
            if(!this.$route.params.deviceId)
                this.$router.push("homes"); // Route 404 view

            Api.device.get(this.$route.params.deviceId)
                .then( data => {
                    this.device = new Device(data.result.id, data.result.name, data.result.type, data.result.meta, data.result.state, data.result.room);

                    this.awaitingLogs = true;
                    this.device.getLogs(this.pageSize, 0)
                        .then( data => {
                            this.logs = data.result.filter( log => log.result);
                            if(this.logs.length === 0)
                                this.noLogs = true;
                            else
                                this.checkLastPage();
                        })
                        .catch(console.log)
                        .finally( () => {
                            this.awaitingLogs = false;
                            this.loadingPage = false;
                        });
                })
                .catch( () => this.$router.push("homes")); //Deberia validar codigo de error y llevarlo a 404.
        }
    }
</script>

<style scoped>

</style>