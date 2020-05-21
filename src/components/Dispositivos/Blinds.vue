<template>
    <v-card class="disp">
        <v-container >
            <v-row dense>
                <v-col cols="12" class="px-5">
                    <disp-info
                            :name="props.getName()"
                            :state="state"
                            :room="location"
                            :icon="iconInfo"
                            :fav="props.isFav()"
                            @disp-event="eventHandler.handle($event)"
                    ></disp-info>
                </v-col>
                <v-col cols="12" class="px-5">
                    <v-container fluid class="py-0 px-0"> <!--class="px-3 py-0" -->
                        <v-row align="center" dense justify="center" ><!--class="my-0 py-0" -->
                            <v-col cols="8">
                                <v-btn :disabled="level.awaitingResponse" :loading="level.awaitingResponse"
                                       color="#72E1C7" class="black--text mx-2" rounded @click="closeBlinds()">
                                    Bajar
                                </v-btn>
                                <v-btn :disabled="level.awaitingResponse" :loading="level.awaitingResponse"
                                       color="#72E1C7" class="black--text darken-4" rounded @click="openBlinds()">
                                    Subir
                                </v-btn>
                            </v-col>
                            <v-col cols="4" align="end">
                                <v-btn color="#6563FF" text @click="extraControllers.changeState()">{{extraControllers.message}}</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
            <v-row  dense v-show="extraControllers.value">
                <v-col cols="12" class="px-5">
                    <v-card-text class="py-0 my-0">
                        <v-row>
                            <v-col class="py-0 my-0">
                                <p class="font-weight-medium subtitle-1 my-0">Seleccione nivel:</p>
<!--                                <v-list-item class="px-0">-->
<!--                                    <v-list-item-content class="ma-1 pa-1">-->
<!--                                        <v-list-item-subtitle class="title">Seleccione Posicion:</v-list-item-subtitle>-->
<!--                                    </v-list-item-content>-->
<!--                                </v-list-item>-->
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="pr-4">
                                <v-form v-model="level.validInput">
                                    <v-slider
                                            color="#65C0AB"
                                            thumb-color="#87FFE3"
                                            track-color="#A8DED1"
                                            :disabled="level.awaitingResponse"
                                            :loading="level.awaitingResponse"
                                            v-model="level.value"
                                            @change="level.changeState()"
                                            class="align-center"
                                            :max='level.maxValue'
                                            :min='level.minValue'
                                            hide-details>
                                        <template v-slot:append>
                                            <v-text-field
                                                    :disabled="level.awaitingResponse"
                                                    :loading="level.awaitingResponse"
                                                    class="inputNumber"
                                                    v-model="level.value"
                                                    @change="level.changeState()"
                                                    solo rounded flat outlined dense
                                                    :rules="level.rules"
                                            ></v-text-field>
                                        </template>
                                    </v-slider>
                                </v-form>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    import DispInfo from "./DispInfo";
    import Device from "@/assets/js/Device";
    import {DeviceEventHandler, ExtraControls, getLocation, NumberField} from "@/assets/js/DevicesLib";
    const lib = require("../../assets/js/lib");

    export default {
        name: "Blinds",
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
                extraControllers: new ExtraControls(),
                location: getLocation(this.props),
                eventHandler: new DeviceEventHandler(this.props),
                level: new NumberField(this.props, 'level', 'setLevel'),
                statePolling: null
            }
        },
        computed: {
            state() {
                // console.log(this.props.state.level);
                if (this.props.state.level >= 75) {
                    return 'Abierta';
                } else if (this.props.state.level >=25)
                    return 'Entreabierta';
                else
                    return 'Cerrada';
            },
        },
        methods: {
            closeBlinds(){
                this.level.value = this.level.minValue;
                this.level.changeState();
            },
            openBlinds(){
                this.level.value = this.level.maxValue;
                this.level.changeState();
            },
            stateChangeHandler(newState) {
                this.level.value = newState.level;
            }
        },
        mounted(){
            let actions = [
                this.level.getActionLoaderObject()
            ]
            lib.loadAllSupportedValues(this.props.type.id, actions);

            this.statePolling = lib.setStatePolling.call(this, this.stateChangeHandler.bind(this), 10000);
        },
        beforeDestroy() {
            if(this.statePolling)
                clearInterval(this.statePolling);
        }
    }
</script>

<style scoped>

</style>