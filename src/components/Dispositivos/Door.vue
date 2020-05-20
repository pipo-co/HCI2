<template>
    <v-card>
        <v-container>
            <v-row dense>
                <v-col cols="12" class="px-5">
                    <disp-info
                            :name="props.getName()"
                            :state="state"
                            :room="location"
                            :icon="iconInfo"
                            :fav="props.isFav()"
                            @disp-event="handleDispInfoEvents($event)"
                    ></disp-info>
                </v-col>
                <v-col cols="12" class="px-5">
                    <v-container fluid class="py-0 px-0"> <!--class="px-3 py-0" -->
                        <v-row align="center" dense justify="center"><!--class="my-0 py-0" -->
                            <v-col>
                                <v-btn :disabled="lock.value" :loading="open.awaitingResponse"
                                       class="mx-1" @click="open.changeState()">{{opened}}</v-btn>
                                <v-btn :disabled="lock.awaitingResponse" :loading="lock.awaitingResponse"
                                       class="mx-1" @click="lock.changeState()">{{locked}}</v-btn>
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
    const lib = require("../../assets/js/lib");

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
                iconInfo: lib.getIconInfo(this.props.type.name),
                eventHandlers:{
                    fav(target){ //target == this
                        if (target.props.isFav())
                            target.props.unFav();
                        else
                            target.props.fav();
                    },
                    edit(target){
                        console.log(`Edit handler ${target}`);
                    },
                    history(target){
                        console.log(`History handler ${target}`);
                    },
                    delete (target){
                        console.log(`Delete handler ${target}`);
                    },
                },
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
            },
            location() {
                return `${this.props.room.home.name} - ${this.props.room.name}`
            },
        },
        methods: {
            handleDispInfoEvents(event){
                this.eventHandlers[event.eventName](this);
            },
            isLocked(){
                return this.lock.value === 'locked'
            },
            openDoor(){
                this.props.state.status = "open";
                this.open.value = true;
                this.updateStateValue(this.open.action);
            },
            closeDoor(){
                this.props.state.status = "close";
                this.close.value = true;
                this.updateStateValue(this.close.action);
            },
            lockDoor(){
                if (this.props.state.lock === "locked"){
                    this.lock.value = false;
                    this.unlock.value = true;
                    this.props.state.lock = "unlocked";
                    this.updateStateValue(this.unlock.action);
                }else {
                    this.lock.value = true;
                    this.unlock.value = false;
                    this.props.state.lock = "locked";
                    this.updateStateValue(this.lock.action);
                }
            },
            updateStateValue(action, params = []){
                this.props.execute(action, params)
                    .then(console.log)
                    .catch(errors => console.log(`${action} - Update Value ${errors}`))
            }
        },
    }

</script>

<style scoped>

</style>