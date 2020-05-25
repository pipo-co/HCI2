<template>
    <v-card :id="`#${props.id}`" shaped raised>
        <v-container class="pt-0">
            <v-row dense>
                <v-col cols="12" class="px-5">
                    <disp-info
                            :device="props"
                            :state="state"
                            @delete="freeResources()"
                    ></disp-info>
                </v-col>
                <v-col cols="12" class="px-5">
                    <v-container fluid class="py-0 px-0"> <!--class="px-3 py-0" -->
                        <v-row align="center" dense justify="center"><!--class="my-0 py-0" -->
                            <v-col>
                                <v-btn :disabled="lock.value" :loading="open.awaitingResponse"
                                       color="#72E1C7" rounded class="black--text mx-1" @click="open.changeState()">{{opened}}</v-btn>
                                <v-btn :disabled="lock.awaitingResponse" :loading="lock.awaitingResponse"
                                       color="#72E1C7" rounded class="black--text mx-1" @click="lock.changeState()">{{locked}}</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    import DispInfo from "./DispInfo";
    import Device from "@/assets/js/Device";
    import {ButtonStatus} from "@/assets/js/DevicesLib";
    import {getIconInfo, setStatePolling} from "../../assets/js/lib";

    export default {
        name: "door",
        components:{DispInfo},
        props: {
            props: {
                type: Device,
                required: true
            }
        },
        data(){
            return{
                iconInfo: getIconInfo(this.props.type.name),
                statePolling: null,
                open: new ButtonStatus(this.props, 'status', 'open', 'close', 'opened', 'closed'),
                lock: new ButtonStatus(this.props, 'lock', 'lock', 'unlock', 'locked', 'unlocked')
            }
        },
        computed: {
            state(){
                if (this.props.state.lock === "locked"){
                    return "Bloqueda";
                }
                else if (this.props.state.status === "closed"){
                    return "Cerrada";
                }
                else{
                    return "Abierta";
                }
            },
            opened(){
                if (this.props.state.status === 'closed'){
                    return "Abrir";
                }else
                    return "Cerrar";
            },
            locked(){
                if (this.props.state.lock === 'locked'){
                    return "Desbloquear";
                }else
                    return "Bloquear";
            }
        },
        methods: {
            stateChangeHandler(newState) {
                this.open.value = newState.status === this.open.statusTrue;

                this.lock.value = newState.lock === this.lock.statusTrue;
            },
            freeResources(){
                if(this.statePolling)
                    clearInterval(this.statePolling);
            }
        },
        mounted() {
            this.statePolling = setStatePolling.call(this, this.stateChangeHandler.bind(this), 10000);
        },
        beforeDestroy() {
            this.freeResources();
        }
    }

</script>

<style scoped>

</style>