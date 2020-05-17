<template>
    <v-card class="disp">
        <v-container >
            <v-row dense>
                <v-col cols="12" class="px-5">
                    <disp-info
                            :name="props.name"
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
                                <v-switch v-model="status.value" dense></v-switch><!--class="px-3 my-auto" -->
                            </v-col>
                            <v-col>
                                <v-btn icon >
                                    <v-icon @click="decreaseTemperature()">mdi-minus</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-text-field
                                        class="inputNumber"
                                        v-model="props.state.temperature"
                                        solo rounded flat outlined dense
                                        suffix="º"
                                        :rules="temperature.validate"

                                ></v-text-field>
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
                                <v-btn-toggle v-model="props.state.mode" rounded dense :mandatory="true">
                                    <v-btn v-for="mode in mode.supportedValues" text :key="mode" :value="mode">{{mode}}</v-btn>
                                </v-btn-toggle>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
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
                                <v-btn-toggle v-model="props.state.verticalSwing" rounded dense :mandatory="true">
                                    <v-btn v-for="mode in swing.vertical.supportedValues" text :key="mode" :value="mode">
                                        {{mode}}
                                    </v-btn>
                                </v-btn-toggle>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
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
                                <v-btn-toggle v-model="props.state.horizontalSwing" rounded dense :mandatory="true">
                                    <v-btn v-for="mode in swing.horizontal.supportedValues" text :key="mode" :value="mode">
                                        {{mode}}
                                    </v-btn>
                                </v-btn-toggle>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
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
                                <v-btn-toggle v-model="props.state.fanSpeed" rounded dense :mandatory="true">
                                    <v-btn v-for="mode in fan.supportedValues" text :key="mode" :value="mode">{{mode}}</v-btn>
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
                iconInfo: {
                    bgColor: '#FFF3C8',
                    color: '#FDC701',
                    src: 'mdi-fan'
                },
                extraControllers: {
                    value: false,
                    message: 'Mas',
                },
                events:{
                    fav(target){
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
                    },

                },
                mode:{
                    supportedValues: null,
                    action: 'setMode',
                },
                swing:{
                    vertical:{
                        supportedValues: null,
                        action: 'setVerticalSwing',
                    },
                    horizontal:{
                        supportedValues: null,
                        action: 'setHorizontalSwing',
                    }
                },
                fan:{
                    supportedValues: null,
                    action: 'setFanSpeed',
                },
                temperature: {
                    minValue:null,
                    maxValue:null,
                    action:'setTemperature',
                    validate:
                        [
                            temp => /[0-9]+/.test(temp) || "La temperatura debe ser un numero",
                            temp => temp >= this.temperature.minValue || "Valor por debajo del minimo",
                            temp => temp <= this.temperature.maxValue || "Valor por arriba del maximo",
                        ],
                },
                status:{
                    value: this.props.state.status === 'on',
                }
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
            loadSupportedModes(params){
                this.mode.supportedValues = params[0].supportedValues;
                // console.log(this.mode.supportedValues);
            },
            loadSupportedVerticalSwing(params){
                this.swing.vertical.supportedValues = params[0].supportedValues;
                // console.log(this.swing.vertical.supportedValues);
            },
            loadSupportedHorizontalSwing(params){
                this.swing.horizontal.supportedValues = params[0].supportedValues;
                // console.log(this.swing.horizontal.supportedValues);
            },
            loadSupportedFanSpeeds(params){
                this.fan.supportedValues = params[0].supportedValues;
                // console.log(this.fan.supportedValues);
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
            handleDispInfoEvents(event){
                this.events[event.event](this);
            },

            // eslint-disable-next-line no-undef
            // updateStateValue: _.debounce(function (action, params) {
            //     this.props.execute(action, params)
            //         .then(console.log)
            //         .catch( errors => console.log(`Temperature - Update value ${errors}`) );
            // }, 500)
        },
        mounted() {
            lib.deviceTypeActionParams(this.props.type.id, this.mode.action)
                .then(this.loadSupportedModes)
                .catch( errors => console.log(`Mode - Supported values  ${errors}`) );
            lib.deviceTypeActionParams(this.props.type.id, this.swing.vertical.action)
                .then(this.loadSupportedVerticalSwing)
                .catch( errors => console.log(`Vertical swing - Supported values  ${errors}`) );
            lib.deviceTypeActionParams(this.props.type.id, this.swing.horizontal.action)
                .then(this.loadSupportedHorizontalSwing)
                .catch( errors => console.log(`Horizontal swing - Supported values  ${errors}`) );
            lib.deviceTypeActionParams(this.props.type.id, this.fan.action)
                .then(this.loadSupportedFanSpeeds)
                .catch( errors => console.log(`Fan speed - Supported values  ${errors}`) );
            lib.deviceTypeActionParams(this.props.type.id, this.temperature.action)
                .then(this.loadSupportedTemperature)
                .catch( errors => console.log(`Temperature - Supported values  ${errors}`) );
        },
        watch:{
            'props.state.mode'(){
                this.props.execute(this.mode.action, [this.props.state.mode])
                    .then(console.log)
                    .catch( errors => console.log(`Mode - Update value ${errors}`) );
            },
            'props.state.verticalSwing'(){
                this.props.execute(this.swing.vertical.action, [this.props.state.verticalSwing])
                    .then(console.log)
                    .catch( errors => console.log(`Vertical swing - Update value ${errors}`) );
            },
            'props.state.horizontalSwing'(){
                this.props.execute(this.swing.horizontal.action, [this.props.state.horizontalSwing])
                    .then(console.log)
                    .catch( errors => console.log(`Vertical swing - Update value ${errors}`) );
            },
            'props.state.fanSpeed'(){
                this.props.execute(this.fan.action, [this.props.state.fanSpeed])
                    .then(console.log)
                    .catch( errors => console.log(`Fan speed - Update value ${errors}`) );
            },
            'props.state.temperature'(){
                if(!this.temperature.validate[0](this.props.state.temperature))
                    return;

                // this.updateStateValue(this.temperature.action, [this.props.state.temperature]);

                this.props.execute(this.temperature.action, [this.props.state.temperature])
                    .then(console.log)
                    .catch( errors => console.log(`Temperature - Update value ${errors}`) );
            },
            'status.value'(){
                if(this.status.value){
                    this.props.state.status = 'on';
                    this.props.execute('turnOn')
                        .then(console.log)
                        .catch( errors => console.log(`Status - Update value ${errors}`) );
                }
                else{
                    this.props.state.status = 'off';
                    this.props.execute('turnOff')
                        .then(console.log)
                        .catch( errors => console.log(`Status - Update value ${errors}`) );
                }
                console.log(this.props.state.status);
            },
            'props.state.status'(){
                this.status.value = this.props.state.status === 'on'
            },
        }
    }
</script>

<style scoped>

</style>