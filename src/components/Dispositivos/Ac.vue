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
                            :fav="false"
                    ></disp-info>
                </v-col>
                <v-col cols="12" class="px-5">
                    <v-container class="py-0"> <!--class="px-3 py-0" -->
                        <v-row align="center" dense justify="space-around"><!--class="my-0 py-0" -->
                            <v-col>
                                <v-switch dense></v-switch><!--class="px-3 my-auto" -->
                            </v-col>
                            <v-col>
                                <v-btn icon >
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-btn text small>24ºC</v-btn>
                            </v-col>
                            <v-col>
                                <v-btn icon >
                                    <v-icon>mdi-plus</v-icon>
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
                                <v-btn-toggle v-model="props.state.mode" rounded dense>
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
                                <v-btn-toggle v-model="props.state.verticalSwing" rounded dense>
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
                                <v-btn-toggle rounded dense>
                                    <v-btn text>Auto</v-btn>
                                    <v-btn text>-90</v-btn>
                                    <v-btn text>-45</v-btn>
                                    <v-btn text>0</v-btn>
                                    <v-btn text>45</v-btn>
                                    <v-btn text>90</v-btn>
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
                                <v-btn-toggle rounded dense>
                                    <v-btn text>Auto</v-btn>
                                    <v-btn text>25</v-btn>
                                    <v-btn text>50</v-btn>
                                    <v-btn text>75</v-btn>
                                    <v-btn text>100</v-btn>
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
            updateState() {
                this.dev.getState().then(data => {
                    this.disp.state = data.result;
                }).catch(error => {
                    console.log(`Error ${error}`);
                });
            },
            loadSupportedModes(params){
                this.mode.supportedValues = params[0].supportedValues;
                console.log(this.mode.supportedValues);
            },
            loadSupportedVerticalSwing(params){
                this.swing.vertical.supportedValues = params[0].supportedValues;
                console.log(this.swing.vertical.supportedValues);
            },
            loadSupportedHorizontalSwing(params){
                this.swing.horizontal.supportedValues = params[0].supportedValues;
                console.log(this.swing.horizontal.supportedValues);
            },
            increaseTemperature() {
                if (this.temperature.value < this.temperature.maxValue)
                    this.temperature.value += 5;
            },
            decreaseTemperature() {
                if (this.temperature.minValue < this.temperature.value)
                    this.temperature.value -= 5;
            },
            controllerHandler() {
                this.extraControllers.value = !this.extraControllers.value;
                if (this.extraControllers.value)
                    this.extraControllers.message = 'Menos';
                else
                    this.extraControllers.message = 'Mas';
            },
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

        },
        watch:{
            'props.state.mode'(){
                this.props.execute(this.mode.action, [this.props.state.mode])
                    .then(console.log)
                    .catch( errors => console.log(`Mode - Update value ${errors}`) );
            }
        }
    }
</script>

<style scoped>

</style>