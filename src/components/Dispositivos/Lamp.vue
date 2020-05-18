<template>
    <v-card>
        <v-container >
            <v-row no-gutters dense>
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
                <v-col md="12"  class="px-5">
                    <v-container fluid class="py-0"> <!--class="px-3 py-0" -->
                        <v-row align="center" dense justify="space-around"><!--class="my-0 py-0" -->
                            <v-col cols="1" class="ma-0 pa-0">
                                <v-switch v-model="booleanStatus.value" @change="invertBooleanState"></v-switch><!--class="px-3 my-auto" -->
                            </v-col>
                            <v-col cols="7" class="ma-0 pa-0">
                                <v-form v-model="brightness.validInput">
                                    <v-slider
                                            v-model="brightness.selectedValue"
                                            class="align-center"
                                            prepend-icon="mdi-weather-sunny"
                                            :max="brightness.maxValue"
                                            :min="brightness.minValue"
                                            hide-details
                                            thumb-label
                                    ></v-slider>
                                </v-form>
                            </v-col>
                            <v-col cols="2" class="ma-0 pa-0"><!--class="pr-10" -->
                                <v-btn text @click="controllerHandler()">{{extraControllers.message}}</v-btn>
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
                                        <v-list-item-title align="left" class="title">Seleccione Color</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col cols="12">
                                <color-picker class="ma-auto" v-bind="color" @input="onInput"></color-picker>
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
                color: {
                    hue: 50,
                    saturation: 100,
                    luminosity: 50,
                    alpha: 1
                },
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
                booleanStatus: {
                    actionTrue: 'turnOn',
                    statusFalse: 'off',
                    statusTrue: 'on',
                    actionFalse: 'turnOff',
                    value: this.props.state.status === 'on'
                },
                brightness: {
                    selectedValue: this.props.state.brightness,
                    minValue: null,
                    maxValue: null,
                    action: 'setBrightness',
                    validInput: true,
                    validate:
                        [
                            v => !!v || "Debe ingresar un valor numerico",
                            v => v >= this.dispense.minValue && v <= this.dispense.maxValue || `El valor debe estar entre ${this.dispense.minValue} y ${this.dispense.maxValue}`
                        ]
                }
            }
        },
        computed: {
            state() {
                if(this.props.state.status === 'off')
                    return 'Off';
                return `Prendido: ${this.props.state.color} ${this.props.state.brightness}%`;
            },
            location(){
                return `${this.props.getHomeName()} - ${this.props.getRoomName()}`;
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
                    this.excecuteAction(this.brightness.action, [this.brightness.selectedValue]);
                    this.props.state.brightness = this.brightness.selectedValue;
                }
            },
            invertBooleanState(){
                if(this.booleanStatus.value) {
                    this.excecuteAction(this.booleanStatus.actionTrue);
                    this.props.state.status = this.booleanStatus.statusTrue;
                }
                else {
                    this.excecuteAction(this.booleanStatus.actionFalse);
                    this.props.state.status = this.booleanStatus.statusFalse;
                }
            },
            onInput(hue) {
                this.color.hue = hue;
            }
        },
        mounted(){
            let actions = [
                {action: this.brightness.action, handler: this.loadSupportedBrightness}
            ];
            lib.loadAllSupportedValues(this.props.type.id, actions);
            console.log(this.brightness.selectedValue);
            console.log(this.props.state.brightness);
        }
    };
</script>

<style scoped>
    @import '~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';
</style>