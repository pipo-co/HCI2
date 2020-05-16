<template>
    <v-card class="disp">
        <v-container >
            <v-row dense>
                <v-col cols="12" class="px-5">
                    <disp-info
                            :name="disp.name"
                            :state="state"
                            :icon="iconInfo"
                            room="Living"
                            :fav="false"
                    ></disp-info>
                </v-col>
                <v-col cols="12"  class="px-5">
                    <v-container class="py-0"> <!--class="px-3 py-0" -->
                        <v-row align="baseline" dense justify="space-around"><!--class="my-0 py-0" -->
                            <v-col>
                                <v-switch v-model="status.value" dense hide-details="true"></v-switch><!--class="px-3 my-auto" -->
                            </v-col>
                            <v-col>
                                <v-btn icon >
                                    <v-icon @click="decreaseTemperature()">mdi-minus</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-text-field
                                        class="inputNumber"
                                        v-model="temperature.value"
                                        solo rounded flat outlined dense
                                        suffix="º"
                                        hide-details="true"

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
                        <v-container class="py-0">
                            <v-row align="center" justify="start">
                                <v-col cols="3">
                                    <v-list-item class="px-0">
                                        <v-list-item-content>
                                            <v-list-item-title align="left" class="subtitle-1">Fuente Calor</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col class="py-0"> <!--class="pr-10" -->
                                    <v-select :items="heat.supportedValue" v-model="heat.value" dense ></v-select>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>
                    <v-col cols="12" class="px-5">
                        <v-container class="py-0">
                            <v-row align="center" justify="start">
                                <v-col cols="3">
                                    <v-list-item class="px-0">
                                        <v-list-item-content>
                                            <v-list-item-title align="left" class="subtitle-1">Modo Grill</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col class="py-0"> <!--class="pr-10" -->
                                    <v-select :items="grill.supportedValue" v-model="grill.value" dense value="Convencional"></v-select>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>
                    <v-col cols="12" class="px-5">
                    <v-container class="py-0">
                        <v-row align="center" justify="start">
                            <v-col cols="3">
                                <v-list-item class="px-0">
                                    <v-list-item-content>
                                        <v-list-item-title align="left" class="subtitle-1">Conveccion</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col class="py-0"> <!--class="pr-10" -->
                                <v-select :items="convection.supportedValue" v-model="convection.value" dense ></v-select>
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
    import Api from "../../assets/js/Api.js";

    export default {
        name: "oven",
        components:{DispInfo},
        props: {
            disp: {
                type: Object,
                required: true
            }
        },
        data(){
          return{
              iconInfo:{
                  bgColor: '#FFBBBB',
                  color: '#C01616',
                  src:'mdi-stove'
              },
              status:{
                  value: null,
              },
              grill: {
                  value: null,
                  supportedValue: null,
              },
              heat:{
                  value: null,
                  supportedValue: null,
              },
              convection:{
                  value: null,
                  supportedValue: null,
              },
              temperature:{
                  value: null,
                  minValue: 60, //hardCoded
                  maxValue: 400, //hardCoded
                },
              extraControllers: {
                  value: false,
                  message: 'Mas',
              },
              isOn: this.disp.state.status === 'on',
              dev: new Device(this.disp.id, this.disp.name, this.disp.type, this.disp.meta, this.disp.state, this.disp.room, this.disp.home)
          }
        },
        computed:{
            state(){
                if(this.disp.state.status === 'off')
                    return 'Off'
                return `Prendido: ${this.disp.state.heat} ${this.disp.state.temperature}º`
            }
        },
        mounted() {
            Api.deviceType.get(this.disp.type.id).then(data =>{
                let action;

                action = data.result.actions.filter(act => act.name === 'setHeat')[0];
                this.heat.supportedValue = action.params[0].supportedValues;

                action = data.result.actions.filter(act => act.name === 'setGrill')[0];
                this.grill.supportedValue = action.params[0].supportedValues;

                action = data.result.actions.filter(act => act.name === 'setConvection')[0];
                this.convection.supportedValue = action.params[0].supportedValues;

                console.log(this.disp.state)
                this.convection.value = this.disp.state.convection
                this.grill.value = this.disp.state.grill
                this.heat.value = this.disp.state.heat
                this.temperature.value = this.disp.state.temperature

            }).catch(error => {
                console.log(`Error ${error}`);
            })
        },
        watch:{
            'status.value': function() {
                if (this.status.value){
                    this.dev.execute('turnOn').then(this.updateState).catch(error => {
                        console.log(`Error ${error}`);
                    });
                }
                else{
                    this.dev.execute('turnOff').then(this.updateState).catch(error => {
                        console.log(`Error ${error}`);
                    });
                }
            }
        },
        methods: {
            updateState() {
                this.dev.getState().then(data => {
                    this.disp.state = data.result;
                }).catch(error => {
                    console.log(`Error ${error}`);
                });
            },
            increaseTemperature(){
                if(this.temperature.value < this.temperature.maxValue)
                    this.temperature.value += 5;
            },
            decreaseTemperature(){
                if(this.temperature.minValue < this.temperature.value)
                    this.temperature.value -= 5;

            },
            controllerHandler(){
                this.extraControllers.value = ! this.extraControllers.value;
                if(this.extraControllers.value)
                    this.extraControllers.message = 'Menos';
                else
                    this.extraControllers.message = 'Mas';

            },
        }
    }
</script>

<style scoped>
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>