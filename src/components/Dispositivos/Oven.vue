<template>
    <v-card class="disp">
        <v-container >
            <v-row dense>
                <v-col cols="12" class="px-5">
                    <disp-info
                            :name="props.getName()"
                            :state="state"
                            :icon="iconInfo"
                            :room="location"
                            :fav="props.isFav()"
                            @disp-event="handleDispInfoEvents($event)"
                    ></disp-info>
                </v-col>
                <v-col cols="12"  class="px-5">
                    <v-container class="py-0"> <!--class="px-3 py-0" -->
                        <v-row align="baseline" dense justify="space-around"><!--class="my-0 py-0" -->
                            <v-col>
                                <v-switch
                                          hide-details="true"
                                          v-model="status.value"
                                          @change="status.changeState()"
                                          :loading="status.awaitingResponse"
                                          :disabled="status.awaitingResponse">
                                </v-switch><!--class="px-3 my-auto" -->
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
                            <v-row align="baseline" justify="start">
                                <v-col cols="3">
                                    <v-list-item class="px-0">
                                        <v-list-item-content>
                                            <v-list-item-title align="left" class="subtitle-1">Fuente Calor</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col class="py-0"> <!--class="pr-10" -->
                                    <v-form v-model="heat.validInput">
                                        <v-select :items="heat.supportedValues" v-model="heat.value"
                                                  @change="heat.changeState()" dense
                                                  :loading="heat.awaitingResponse"
                                                  :disabled="heat.awaitingResponse" ></v-select>
                                    </v-form>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>
                    <v-col cols="12" class="px-5">
                        <v-container class="py-0">
                            <v-row align="baseline" justify="start">
                                <v-col cols="3">
                                    <v-list-item class="px-0">
                                        <v-list-item-content>
                                            <v-list-item-title align="left" class="subtitle-1">Modo Grill</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
<!--                                <v-col class="py-0"> &lt;!&ndash;class="pr-10" &ndash;&gt;-->
<!--                                    <v-select :items="grill.supportedValues" v-model="grill.value" dense value="Convencional"></v-select>-->
<!--                                </v-col>-->
                                <v-col class="py-0"> <!--class="pr-10" -->
                                    <v-form v-model="grill.validInput">
                                        <v-select :items="grill.supportedValues" v-model="grill.value"
                                                  @change="grill.changeState()" dense
                                                  :loading="grill.awaitingResponse"
                                                  :disabled="grill.awaitingResponse" >
                                        </v-select>
                                    </v-form>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>
                    <v-col cols="12" class="px-5">
                    <v-container class="py-0">
                        <v-row align="baseline" justify="start">
                            <v-col cols="3">
                                <v-list-item class="px-0">
                                    <v-list-item-content>
                                        <v-list-item-title align="left" class="subtitle-1">Conveccion</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col class="py-0"> <!--class="pr-10" -->
                                <v-form v-model="convection.validInput">
                                    <v-select :items="convection.supportedValues" v-model="convection.value"
                                              @change="convection.changeState()" dense
                                              :loading="convection.awaitingResponse"
                                              :disabled="convection.awaitingResponse" ></v-select>
                                </v-form>
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
    import {SelectionField, BooleanStatus } from "../../assets/js/DevicesLib";
    const lib = require("../../assets/js/lib")

    export default {
        name: "oven",
        components:{DispInfo},
        props: {
            props: {
                type: Device,
                required: true
            }
        },
        data(){
          return{
              iconInfo:lib.getIconInfo(this.props.type.name),
              extraControllers: {
                  value: false,
                  message: 'Mas',
              },
              status: new BooleanStatus(this.props, 'status', 'turnOn', 'turnOff','on','off'),
              grill: new SelectionField(this.props,'grill','setGrill'),
              heat: new SelectionField(this.props,'heat','setHeat',),
              convection: new SelectionField(this.props,'convection','setConvection'),
              temperature:{
                  value: 0,
                  action: 'setTemperature',
                  minValue: 0, //hardCoded
                  maxValue: 0, //hardCoded
                },
          }
        },
        computed:{
            state(){
                if(!this.status.value)
                    return 'Off'
                return `Prendido: ${this.props.state.heat} ${this.props.state.temperature}º`
            },
            location() {
                return `${this.props.getHomeName()} - ${this.props.getRoomName()}`
            },
        },
        mounted() {

            let actions = [
                this.convection.getActionLoaderObject(),
                this.heat.getActionLoaderObject(),
                this.grill.getActionLoaderObject(),
                {action: this.temperature.action, handler: this.loadSupportedTemperature}
            ];
            lib.loadAllSupportedValues(this.props.type.id, actions);
            console.log(this.convection);

        },
        methods: {

            loadSupportedTemperature(params){
                this.temperature.minValue = params[0].minValue;
                this.temperature.maxValue = params[0].maxValue;
                this.temperature.value = this.props.state.temperature;
                // console.log(this.temperature.minValue);
                // console.log(this.temperature.maxValue);
            },


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