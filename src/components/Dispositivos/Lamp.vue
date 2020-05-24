<template>
    <v-card :id="`#${props.id}`">
        <v-container class="pt-0">
            <v-row no-gutters dense>
                <v-col cols="12" class="px-5">
                    <disp-info :device="props" :state="state">
                        <template v-slot:state>
                            <v-avatar size="16" :color="actualColor"></v-avatar>
                        </template>
                    </disp-info>
                </v-col>
                <v-col md="12"  class="px-5">
                    <v-container fluid class="py-0"> <!--class="px-3 py-0" -->
                        <v-row align="center" dense justify="space-around"><!--class="my-0 py-0" -->
                            <v-col cols="2" class="ma-0 pa-0">
                                <v-switch color="#72E1C7" v-model="booleanStatus.value" @change="invertBooleanState" :loading="booleanStatus.awaitingResponse" :disabled="booleanStatus.awaitingResponse" ></v-switch><!--class="px-3 my-auto" -->
                            </v-col>
                            <v-col cols="7" class="ma-0 pa-0">
                                <v-form v-model="brightness.validInput">
                                    <v-slider
                                            color="#65C0AB"
                                            thumb-color="#65C0AB"
                                            track-color="#A8DED1"
                                            v-model="brightness.selectedValue"
                                            class="align-center"
                                            prepend-icon="mdi-weather-sunny"
                                            :max="brightness.maxValue"
                                            :min="brightness.minValue"
                                            @change="changeBrightness"
                                            :loading="brightness.awaitingResponse"
                                            :disabled="brightness.awaitingResponse"
                                            hide-details
                                            thumb-label
                                    ></v-slider>
                                </v-form>
                            </v-col>
                            <v-col cols="3" class="ma-0 pa-0"><!--class="pr-10" -->
                                <v-btn color="#6563FF" text @click="controllerHandler">{{extraControllers.message}}<v-icon>{{extraControllers.icon}}</v-icon></v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
            <v-row dense v-show="extraControllers.value">
                <v-col md="12"  class="px-5">
                    <v-container fluid class="py-0"> <!--class="px-3 py-0" -->
                        <v-row align="center" dense justify="space-around">
                            <v-col cols="12">
                                <v-list-item class="px-0">
                                    <v-list-item-content class="ma-1 pa-1">
                                        <v-list-item-title class="title">Seleccione Nuevo Color</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col>
                                <color-picker class="mx-auto" :hue="color.hue" variant="persistent" v-model="color.hue" :disabled="color.awaitingResponse" @change="changeColor"></color-picker>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    import ColorPicker from '@radial-color-picker/vue-color-picker';
    import DispInfo from "./DispInfo";
    import Device from "../../assets/js/Device";
    import {ExtraControls} from "../../assets/js/DevicesLib";
    const lib = require("../../assets/js/lib");
    export default {
        name:"lamp",
        components: { ColorPicker, DispInfo},
        props: {
            props: {
                type: Device,
                required: true
            }
        },
        data() {
            return {
                iconInfo: lib.getIconInfo(this.props.type.name),
                statePolling: null,
                extraControllers: new ExtraControls(),
                booleanStatus: {
                    value: this.props.state.status === 'on',
                    actionTrue: 'turnOn',
                    statusFalse: 'off',
                    statusTrue: 'on',
                    actionFalse: 'turnOff',
                    awaitingResponse: false
                },
                brightness: {
                    selectedValue: null,
                    minValue: null,
                    maxValue: null,
                    action: 'setBrightness',
                    validInput: true,
                    awaitingResponse: false,
                    validate:
                        [
                            v => !!v || "Debe ingresar un valor numerico",
                            v => v >= this.dispense.minValue && v <= this.dispense.maxValue || `El valor debe estar entre ${this.dispense.minValue} y ${this.dispense.maxValue}`
                        ]
                },
                color: {
                    hue: null,
                    saturation: 100, //Hardcoded
                    luminosity: 50, //Hardcoded
                    action: 'setColor',
                    awaitingResponse: false
                },

            }
        },
        computed: {
            state() {
                if(this.props.state.status === 'off')
                    return 'Apagado';
                return `Prendido: brillo - ${this.props.state.brightness}% `;
            },
            actualColor(){
                return `#${this.props.state.color}`;
            }
        },
        methods: {
            controllerHandler() {
                this.extraControllers.value = !this.extraControllers.value;
                if (this.extraControllers.value)
                    this.extraControllers.message = 'Menos';
                else
                    this.extraControllers.message = 'Mas';
            },
            loadSupportedBrightness(params){
                this.brightness.minValue = params[0].minValue;
                this.brightness.maxValue = params[0].maxValue;
                this.brightness.selectedValue = this.props.state.brightness;
            },
            changeBrightness(){
                if(this.brightness.validInput){
                    this.brightness.awaitingResponse = true;
                    this.props.execute(this.brightness.action, [this.brightness.selectedValue])
                        .then( response => response.result && (this.props.state.brightness = this.brightness.selectedValue))
                        .catch(console.log)
                        .finally( () => this.brightness.awaitingResponse = false);
                }
            },
            changeColor(){
                let hex = lib.HSLtoHex(this.color.hue, this.color.saturation, this.color.luminosity);
                this.color.awaitingResponse = true;
                this.props.execute(this.color.action, [hex])
                    .then( response => response.result && (this.props.state.color = hex))
                    .catch(console.log)
                    .finally( () => this.color.awaitingResponse = false);
            },
            invertBooleanState(){
                if(this.booleanStatus.value) {
                    this.booleanStatus.awaitingResponse = true;
                    this.props.execute(this.booleanStatus.actionTrue)
                        .then( response => response.result && (this.props.state.status = this.booleanStatus.statusTrue))
                        .catch(console.log)
                        .finally( () => this.booleanStatus.awaitingResponse = false);
                }
                else {
                    this.booleanStatus.awaitingResponse = true;
                    this.props.execute(this.booleanStatus.actionFalse)
                        .then( response => response.result && (this.props.state.status = this.booleanStatus.statusFalse))
                        .catch(console.log)
                        .finally( () => this.booleanStatus.awaitingResponse = false);
                }
            },
            stateChangeHandler(newState){
                this.booleanStatus.value = newState.status === 'on';

                this.color.hue = lib.hexToHSL(newState.color).hue;

                this.brightness.selectedValue = newState.brightness;
            }
        },
        beforeDestroy() {
            if(this.statePolling)
                clearInterval(this.statePolling);
        },
        mounted(){
            this.statePolling = lib.setStatePolling.call(this, this.stateChangeHandler.bind(this));

            let actions = [
                {action: this.brightness.action, handler: this.loadSupportedBrightness}
            ];
            lib.loadAllSupportedValues(this.props.type.id, actions);
            this.color.hue = lib.hexToHSL(this.props.state.color).hue;
        }
    };
</script>

<style scoped>
    @import '~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';
</style>