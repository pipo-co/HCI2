<template>
    <v-card :id="`#${props.id}`">
        <v-container class="pt-0">
            <v-row dense>
                <v-col cols="12" class="px-5">
                    <disp-info
                            :device="props"
                            :state="state"
                    ></disp-info>
                </v-col>
                <v-col cols="12" class="px-5">
                    <v-container class="py-0"> <!--class="px-3 py-0" -->
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
                            <v-col cols="2">
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

                            <v-col cols="2"><!--class="pr-10" -->
                                <v-btn text color="#6563FF" @click="extraControllers.changeState()">{{extraControllers.message}}<v-icon>{{extraControllers.icon}}</v-icon></v-btn>
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
                                        <v-list-item-title class="title">Modo:</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col md="10" class="py-0"> <!--class="pr-10" -->
                                <v-btn-toggle v-model="mode.value" rounded dense
                                              @change="mode.changeState()"
                                              :mandatory="true">
                                    <v-btn color="#6563FF" v-for="value in mode.supportedValues"
                                           text :key="value" :value="value"
                                           :loading="mode.awaitingResponse"
                                           :disabled="mode.awaitingResponse">
                                        {{$vuetify.lang.t(`$vuetify.${value}`)}}
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
                                        <v-list-item-title class="title">Desplazamiento de Aspas</v-list-item-title>
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
                                        <v-list-item-title class="text--primary">Vertical:</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col md="10" class="py-0"> <!--class="pr-10" -->
                                <v-btn-toggle v-model="swing.vertical.value" rounded dense
                                              @change="swing.vertical.changeState()"
                                              :mandatory="true">
                                    <v-btn color="#6563FF" v-for="value in swing.vertical.supportedValues"
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
                                        <v-list-item-title class="text--primary">Horizontal:</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col md="10" class="py-0"> <!--class="pr-10" -->
                                <v-btn-toggle v-model="swing.horizontal.value" rounded dense
                                              @change="swing.horizontal.changeState()"
                                              :mandatory="true">
                                    <v-btn color="#6563FF" v-for="value in swing.horizontal.supportedValues"
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
                                        <v-list-item-title class="title">Velocidad Ventilador</v-list-item-title>
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
                                        <v-list-item-title class="text--primary">Horizontal:</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col md="10" class="py-0"> <!--class="pr-10" -->
                                <v-btn-toggle v-model="fan.value" rounded dense
                                              @change="fan.changeState()"
                                              :mandatory="true">
                                    <v-btn color="#6563FF" v-for="value in fan.supportedValues"
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
    import {
        BooleanStatus,
        ExtraControls,
        NumberFieldWithButtons,
        SelectionField,
    } from "@/assets/js/DevicesLib";

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
                iconInfo: lib.getIconInfo(this.props.type.name),
                extraControllers: new ExtraControls(),

                status: new BooleanStatus(this.props,'status','turnOn','turnOff','on','off'),
                mode: new SelectionField(this.props,'mode','setMode'),
                swing: {
                    vertical: new SelectionField(this.props,'verticalSwing','setVerticalSwing'),
                    horizontal: new SelectionField(this.props,'horizontalSwing','setHorizontalSwing'),
                },
                fan: new SelectionField(this.props,'fanSpeed','setFanSpeed'),
                temperature: new NumberFieldWithButtons(this.props,'temperature','setTemperature',1),
            }
        },

        computed: {
            state() {
                if (this.props.state.status === 'off')
                    return 'Off'
                return `Prendido: ${this.props.state.mode} ${this.props.state.temperature}º`
            },
        },

        methods: {
            stateChangeHandler(newState) {
                this.status.value = newState.status === this.status.statusTrue;

                this.mode.value = newState.mode;

                this.swing.vertical.value = newState.verticalSwing;

                this.swing.horizontal.value = newState.horizontalSwing;

                this.fan.value = newState.fanSpeed;

                this.temperature.value = newState.temperature;
            }
        },

        mounted() {
            let actions = [
                    this.mode.getActionLoaderObject(),
                    this.swing.vertical.getActionLoaderObject(),
                    this.swing.horizontal.getActionLoaderObject(),
                    this.fan.getActionLoaderObject(),
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

</style>