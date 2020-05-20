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
                            <v-col md="10" class="py-0"> <!--class="pr-10" -->
                                <v-btn-toggle v-model="multivaluedState.selectedValue" @change="changeState" rounded dense :mandatory="true">
                                    <v-btn v-for="(val, i) in multivaluedState.values" text :key="i" :value="i" :loading="multivaluedState.awaitingResponse" :disabled="multivaluedState.awaitingResponse || (i === 0 && !enoughBattery)">
                                        {{val.text}}
                                    </v-btn>
                                </v-btn-toggle>
                            </v-col>
<!--                            <v-col >-->
<!--                                <v-switch dense></v-switch>&lt;!&ndash;class="px-3 my-auto" &ndash;&gt;-->
<!--                            </v-col>-->
                            <v-col align="end">
                                <v-btn text @click="controllerHandler">{{extraControllers.message}}</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
            <v-row dense v-show="extraControllers.value">
                <v-col cols="12" class="px-5">
                    <v-container fluid class="py-0">
                        <v-row align="center" justify="start">
                            <v-col class="py-0 px-0">
                                <v-list-item class="px-0">
                                    <v-list-item-content>
                                        <v-list-item-title align="left" class="title">Locacion:</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col md="8" class="py-0"> <!--class="pr-10" -->
                                <v-select :items="activeRoom.rooms" v-model="activeRoom.selectedRoom" @change="changeActiveRoom" :loading="activeRoom.awaitingResponse" :disabled="activeRoom.awaitingResponse || invalidRoomChange" dense></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
                <v-col>
                    <v-btn-toggle v-model="mode.value" rounded dense
                                  @change="mode.changeState()"
                                  :mandatory="true">
                        <v-btn v-for="value in mode.supportedValues"
                               text :key="value" :value="value"
                               :loading="mode.awaitingResponse"
                               :disabled="mode.awaitingResponse">
                            {{value}}
                        </v-btn>
                    </v-btn-toggle>
                </v-col>
                <v-btn-toggle rounded dense>

                </v-btn-toggle>
                <!--                            <v-col>-->
                <!--                                <v-btn-toggle v-model="toggle_exclusive" rounded dense>-->
                <!--                                    <v-btn text>pausar</v-btn>-->
                <!--                                    <v-btn text>aspirar</v-btn>-->
                <!--                                    <v-btn text>trapear</v-btn>-->
                <!--                                    <v-btn text>cargar</v-btn>-->
                <!--                                </v-btn-toggle>-->
                <!--                            </v-col>-->
<!--                <v-col cols="12" class="px-5">-->
<!--                    <v-container fluid class="py-0">-->
<!--                        <v-row align="center" justify="start">-->
<!--                            <v-col class="py-0 px-0">-->
<!--                                <v-list-item class="px-0">-->
<!--                                    <v-list-item-content>-->
<!--                                        <v-list-item-title align="left" class="title">Cargador:</v-list-item-title>-->
<!--                                    </v-list-item-content>-->
<!--                                </v-list-item>-->
<!--                            </v-col>-->
<!--                            <v-col md="8" class="py-0"> &lt;!&ndash;class="pr-10" &ndash;&gt;-->
<!--                                <v-select :items="habitaciones" dense value="Living"></v-select>-->
<!--                            </v-col>-->
<!--                        </v-row>-->
<!--                    </v-container>-->
<!--                </v-col>-->
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    import DispInfo from "./DispInfo";
    import Device from "../../assets/js/Device";
    import Api from "../../assets/js/Api";
    import {SelectionField} from "../../assets/js/DevicesLib";
    const lib = require("../../assets/js/lib");

    export default {
        name: "vacuum",
        components:{DispInfo},
        props: {
            props: {
                type: Device,
                required: true
            }
        },
        data(){
            return {
                iconInfo: lib.getIconInfo(this.props.type.name),
                extraControllers: {
                    value: false,
                    message: 'Mas'
                },
                eventHandlers: {
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
                    delete(target){
                        console.log(`Delete handler ${target}`);
                    }
                },
                multivaluedState: {
                    values: [
                        { state: 'active', text: 'Prender', action: 'start'},
                        { state: 'docked', text: 'Cargar', action: 'dock'},
                        { state: 'inactive', text: 'Apagar', action: 'pause'}
                    ],
                    selectedValue: 4,
                    awaitingResponse: false
                },
                mode: new SelectionField(this.props,'mode','setMode'),
                activeRoom: {
                    rooms: null,
                    selectedRoom: null,
                    action: 'setLocation',
                    awaitingResponse: false
                }
            }
        },
        computed:{
            state() {
                if(this.props.state.status === 'inactive')
                    return 'Apagado';
                else if(this.props.state.status === 'docked')
                    return `Cargando Bateria: ${this.props.state.batteryLevel}%`;
                else
                    return `Prendido Bateria: ${this.props.state.batteryLevel}%`;
            },
            location(){
                return `${this.props.getHomeName()} - ${this.props.getRoomName()}`;
            },
            enoughBattery(){
                return this.props.state.batteryLevel >= 5;
            },
            invalidRoomChange(){ // Verificar
                return this.props.state.status !== 'active' || !this.enoughBattery;
            }
        },
        methods: {
            handleDispInfoEvents(event){
                this.eventHandlers[event.eventName](this);
            },
            excecuteAction(action, params){
                this.props.execute(action, params)
                    .then(console.log)
                    .catch( errors => console.log(`${action} -  ${errors}`) );
            },
            loadRooms(){
                Api.home.getHomeRooms(this.props.room.home.id)
                    .then(data => {
                        this.activeRoom.rooms = data.result.map( (room, i) => { return {id: room.id, value: i, text: room.name.split('_').pop()}} );
                        this.activeRoom.selectedRoom = this.activeRoom.rooms.findIndex( elem => elem.id === this.props.state.location.id);
                    })
                    .catch(console.log);
                this.activeRoom.selectedRoom = this.props.state.location.id;
            },
            controllerHandler() {
                this.extraControllers.value = !this.extraControllers.value;
                if (this.extraControllers.value)
                    this.extraControllers.message = 'Menos';
                else
                    this.extraControllers.message = 'Mas';
            },
            changeState(){
                let i = this.multivaluedState.selectedValue;
                if(i < this.multivaluedState.values.length && i >= 0) {
                    let value = this.multivaluedState.values[i];
                    this.multivaluedState.awaitingResponse = true;
                    this.props.execute(value.action) // Falta validar insuficient battery level
                        .then( response => response.result && (this.props.state.status = value.state))
                        .catch(console.log)
                        .finally( () => this.multivaluedState.awaitingResponse = false);
                }
            },
            changeActiveRoom(){
                if(!this.invalidRoomChange) {
                    let room = this.activeRoom.rooms[this.activeRoom.selectedRoom];
                    this.activeRoom.awaitingResponse = true;
                    this.props.execute(this.activeRoom.action, [room.id])
                        .then(response => {
                            if(response.result){
                                this.props.state.location.id = room.id;
                                this.props.state.location.name = room.value;
                            }
                        })
                        .catch(console.log)
                        .finally(() => this.activeRoom.awaitingResponse = false);
                }
            }
        },
        mounted(){
            let actions = [
                this.mode.getActionLoaderObject()
            ];
            lib.loadAllSupportedValues(this.props.type.id, actions);

            this.multivaluedState.selectedValue = this.multivaluedState.values.findIndex(elem => elem.state === this.props.state.status);
            this.loadRooms();
        }
    }
</script>

<style scoped>

</style>