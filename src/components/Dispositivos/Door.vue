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
                                <v-btn :disabled="lock.value" class="mx-1" @click="openDoor()">Abrir</v-btn>
                                <v-btn :disabled="lock.value" class="mx-1" @click="closeDoor()">Cerrar</v-btn>
                                <v-btn class="mx-1" @click="lockDoor()">Bloquear</v-btn>
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
                open: {
                    value: false,
                    action: "open"
                },
                close: {
                    value: false,
                    action: "close"
                },
                lock: {
                    value: false,
                    action: "lock"
                },
                unlock: {
                    value: false,
                    action: "unlock"
                }
            }
        },
        computed: {
            state(){
                if (this.props.state.lock === "locked"){
                    return "Bloqueda";
                }
                else if (this.props.state.status === "close"){
                    return "Cerrada";
                }
                else{
                    return "Abierta";
                }
            },
            location() {
                return `${this.props.room.home.name} - ${this.props.room.name}`
            },
        },
        methods: {
            handleDispInfoEvents(event){
                this.eventHandlers[event.eventName](this);
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