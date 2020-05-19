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
                            @disp-event="handleDispInfoEvents($event)"
                    ></disp-info>
                </v-col>
                <v-col cols="12" class="px-5">
                    <v-container class="py-0"> <!--class="px-3 py-0" -->
                        <v-row align="baseline" dense justify="space-around"><!--class="my-0 py-0" -->
                            <v-col>
                                <v-switch
                                        hide-details="true"
                                        v-model="status.value"
                                        @change="status.changeState()"
                                        :loading="status.awaitingResponse"
                                        :disabled="status.awaitingResponse">
                                </v-switch>
                            </v-col>
                            <v-col>
                                <v-btn icon >
                                    <v-icon @click="decreaseTemperature()">mdi-minus</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-form v-model="temperature.isValid">
                                    <v-text-field
                                            v-model="props.state.temperature"
                                            solo rounded flat outlined dense
                                            suffix="º"
                                            :rules="temperature.validate"
                                    ></v-text-field>
                                </v-form>
                            </v-col>
                            <v-col>
                                <v-btn icon >
                                    <v-icon @click="increaseTemperature()">mdi-plus</v-icon>
                                </v-btn>
                            </v-col>

                            <v-col ><!--class="pr-10" -->
                                <v-btn text @click="controllerHandler()">{{extraControllers.message}}</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
            <v-row dense v-show="extraControllers.value">
                <!--    MODE    -->
                <v-col cols="12" class="px-5">
                    <v-container fluid class="py-0">
                        <v-row align="center" justify="start">
                            <v-col class="py-0 px-0">
                                <v-list-item class="px-0">
                                    <v-list-item-content>
                                        <v-list-item-title class="title" align="left">Modo:</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col md="10" class="py-0"> <!--class="pr-10" -->
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
                        </v-row>
                    </v-container>
                </v-col>
                <!--    SWING    -->
                <v-col cols="12" class="px-5">
                    <v-container fluid class="py-0">
                        <v-row align="center" justify="start">
                            <v-col class="py-0 px-0">
                                <v-list-item class="px-0">
                                    <v-list-item-content>
                                        <v-list-item-title class="title" align="left">Desplazamiento de Aspas</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
                <!--    VERTICAL    -->
                <v-col cols="12" class="px-5">
                    <v-container fluid class="py-0">
                        <v-row align="center" justify="start">
                            <v-col class="py-0 px-0">
                                <v-list-item class="px-0">
                                    <v-list-item-content>
                                        <v-list-item-title class="text--primary" align="left">Vertical:</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col md="10" class="py-0"> <!--class="pr-10" -->
                                <v-btn-toggle v-model="swing.vertical.value" rounded dense
                                              @change="swing.vertical.changeState()"
                                              :mandatory="true">
                                    <v-btn v-for="value in swing.vertical.supportedValues"
                                           text :key="value" :value="value"
                                           :loading="swing.vertical.awaitingResponse"
                                           :disabled="swing.vertical.awaitingResponse">{{value}}
                                    </v-btn>
                                </v-btn-toggle>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
                <!--    HORIZONTAL    -->
                <v-col cols="12" class="px-5">
                    <v-container fluid class="py-0">
                        <v-row align="center" justify="start">
                            <v-col class="py-0 px-0">
                                <v-list-item class="px-0">
                                    <v-list-item-content>
                                        <v-list-item-title class="text--primary" align="left">Horizontal:</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col md="10" class="py-0"> <!--class="pr-10" -->
                                <v-btn-toggle v-model="swing.horizontal.value" rounded dense
                                              @change="swing.horizontal.changeState()"
                                              :mandatory="true">
                                    <v-btn v-for="value in swing.horizontal.supportedValues"
                                           text :key="value" :value="value"
                                           :loading="swing.horizontal.awaitingResponse"
                                           :disabled="swing.horizontal.awaitingResponse">{{value}}
                                    </v-btn>
                                </v-btn-toggle>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
                <!--    FAN    -->
                <v-col cols="12" class="px-5">
                    <v-container fluid class="py-0">
                        <v-row align="center" justify="start">
                            <v-col class="py-0 px-0">
                                <v-list-item class="px-0">
                                    <v-list-item-content>
                                        <v-list-item-title class="title" align="left">Velocidad Ventilador</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
                <!--    SPEED    -->
                <v-col cols="12" class="px-5">
                    <v-container fluid class="py-0">
                        <v-row align="center" justify="start">
                            <v-col class="py-0 px-0">
                                <v-list-item class="px-0">
                                    <v-list-item-content>
                                        <v-list-item-title class="text--primary" align="left">Horizontal:</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col md="10" class="py-0"> <!--class="pr-10" -->
                                <v-btn-toggle v-model="fan.value" rounded dense
                                              @change="fan.changeState()"
                                              :mandatory="true">
                                    <v-btn v-for="value in fan.supportedValues"
                                           text :key="value" :value="value"
                                           :loading="fan.awaitingResponse"
                                           :disabled="fan.awaitingResponse">{{value}}
                                    </v-btn>
                                </v-btn-toggle>
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
    import Device from "../../assets/js/Device";
    const lib = require("../../assets/js/lib")
    import {BooleanStatus, SelectionField} from "../../assets/js/DevicesLib";

    export default {
        name: "ac",
        components: {DispInfo},
        props: {
            props: {
                type: Device,
                required: true
            }
        },
        //TODO acomodar el textfield de temperatura -- Ponele que esta listo
        //TODO hacer el debounce del input
        data() {
            return {
                iconInfo: lib.getIconInfo(this.props.type.name),
                extraControllers: {
                    value: false,
                    message: 'Mas',
                },
                status: new BooleanStatus(this.props,'status','turnOn','turnOff','on','off'),
                mode: new SelectionField(this.props,'mode','setMode'),
                swing: {
                    vertical: new SelectionField(this.props,'verticalSwing','setVerticalSwing'),
                    horizontal: new SelectionField(this.props,'horizontalSwing','setHorizontalSwing'),
                },
                fan: new SelectionField(this.props,'fanSpeed','setFanSpeed'),
                temperature: {
                    // value: this.props.state.temperature,
                    minValue: null,
                    maxValue: null,
                    isValid: true,
                    action:'setTemperature',
                    validate:
                        [
                            temp => /[0-9]+/.test(temp) || "La temperatura debe ser un numero",
                            temp => temp >= this.temperature.minValue || "Valor por debajo del minimo",
                            temp => temp <= this.temperature.maxValue || "Valor por arriba del maximo",
                        ]
                },
            }
        },
        computed: {
            state() {
                if (this.props.state.status === 'off')
                    return 'Off'
                return `Prendido: ${this.props.state.mode} ${this.props.state.temperature}º`
            },
            location() {
                return `${this.props.room.home.name} - ${this.props.room.name}`
            },
        },
        methods: {
            //Deprecated
            updateState() {
                this.dev.getState().then(data => {
                    this.disp.state = data.result;
                }).catch(error => {
                    console.log(`Error ${error}`);
                });
            },

            handleDispInfoEvents(event){
                lib.handleDeviceEvents(event, this)
            },

            loadSupportedTemperature(params){
                this.temperature.minValue = params[0].minValue;
                this.temperature.maxValue = params[0].maxValue;
                // console.log(this.temperature.minValue);
                // console.log(this.temperature.maxValue);
            },

            increaseTemperature() {
                this.props.state.temperature = parseInt(this.props.state.temperature);
                if (this.props.state.temperature < this.temperature.maxValue)
                    this.props.state.temperature += 1;
            },
            decreaseTemperature() {
                this.props.state.temperature = parseInt(this.props.state.temperature);
                if (this.temperature.minValue < this.props.state.temperature)
                    this.props.state.temperature -= 1;
            },

            controllerHandler() {
                this.extraControllers.value = !this.extraControllers.value;
                if (this.extraControllers.value)
                    this.extraControllers.message = 'Menos';
                else
                    this.extraControllers.message = 'Mas';
            },

            updateStateValue(action, params = []){
                this.props.execute(action, params)
                    .then(console.log)
                    .catch( errors => console.log(`${action} - Update value ${errors}`) );
            },
            errorExecutingAction(action, error){
                console.log(`${action} - Update value ${error}`);

            },

        },
        mounted() {
            let actions = [
                    this.mode.getActionLoaderObject(),
                    this.swing.vertical.getActionLoaderObject(),
                    this.swing.horizontal.getActionLoaderObject(),
                    this.fan.getActionLoaderObject(),
                    {action: this.temperature.action, handler: this.loadSupportedTemperature}
                ];
            lib.loadAllSupportedValues(this.props.type.id, actions);
        },
        watch:{
            //TODO agregar todas las validaciones
            'props.state.temperature'(){

                if(!this.temperature.isValid)
                    return;

                this.updateStateValue(this.temperature.action, [this.props.state.temperature]);
            },
        }
    }
</script>

<style scoped>

</style>