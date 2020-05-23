<template>
    <v-card :id="`#${props.id}`">
        <v-container >
            <v-row dense>
                <v-col cols="12" class="px-5">
                    <disp-info
                            :device="props"
                            :state="state"
                    ></disp-info>
                </v-col>
                <v-col cols="12"  class="px-5">
                    <v-container class="py-0">
                        <v-row align="baseline" dense justify="space-around"><!--class="my-0 py-0" -->
                            <v-col cols="2">
                                <v-switch
                                        color="#72E1C7"
                                        hide-details="true"
                                        v-model="status.value"
                                        @change="status.changeState()"
                                        :loading="status.awaitingResponse"
                                        :disabled="status.awaitingResponse">
                                </v-switch>
                            </v-col>
                            <v-col cols="2">
                                <v-btn icon
                                       :disabled="temperature.awaitingResponse"
                                       :loading="temperature.awaitingResponse"
                                       @click="temperature.decrement()">
                                    <v-icon color="#6563FF">mdi-minus</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="3">
                                <v-form v-model="temperature.validInput">
                                    <v-text-field
                                            v-model="temperature.value"
                                            solo rounded flat outlined dense
                                            suffix="º"
                                            :rules="temperature.rules"
                                            :disabled="temperature.awaitingResponse"
                                            :loading="temperature.awaitingResponse"
                                            @change="temperature.changeState()"
                                    ></v-text-field>
                                </v-form>
                            </v-col>
                            <v-col cols="2">
                                <v-btn icon
                                       :disabled="temperature.awaitingResponse"
                                       :loading="temperature.awaitingResponse"
                                       @click="temperature.increment()">
                                    <v-icon color="#6563FF">mdi-plus</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="3"><!--class="pr-10" -->
                                <v-btn color="#6563FF" text @click="extraControllers.changeState()">{{extraControllers.message}}<v-icon>{{extraControllers.icon}}</v-icon></v-btn>
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
                                            <v-list-item-title class="subtitle-1">Fuente Calor</v-list-item-title>
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
                                            <v-list-item-title class="subtitle-1">Modo Grill</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
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
                                        <v-list-item-title class="subtitle-1">Conveccion</v-list-item-title>
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
    import {
        SelectionField,
        BooleanStatus,
        NumberFieldWithButtons,
        ExtraControls,
    } from "@/assets/js/DevicesLib";
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
              iconInfo: lib.getIconInfo(this.props.type.name),
              extraControllers: new ExtraControls(),
              statePolling: null,

              status: new BooleanStatus(this.props, 'status', 'turnOn', 'turnOff','on','off'),
              grill: new SelectionField(this.props,'grill','setGrill'),
              heat: new SelectionField(this.props,'heat','setHeat',),
              convection: new SelectionField(this.props,'convection','setConvection'),
              temperature: new NumberFieldWithButtons(this.props,'temperature','setTemperature',5),
          }
        },
        computed:{
            state(){
                if(!this.status.value)
                    return 'Off'
                return `Prendido: ${this.props.state.heat} ${this.props.state.temperature}º`
            }
        },
        methods: {
            stateChangeHandler(newState) {
                this.status.value = newState.status === this.status.statusTrue;

                this.grill.value = newState.grill;

                this.heat.value = newState.heat;

                this.convection.value = newState.convection;

                this.temperature.value = newState.temperature;
            }
        },
        mounted() {
            let actions = [
                this.convection.getActionLoaderObject(),
                this.heat.getActionLoaderObject(),
                this.grill.getActionLoaderObject(),
                this.temperature.getActionLoaderObject(),
            ];

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
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>