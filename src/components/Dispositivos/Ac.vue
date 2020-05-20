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
                                <v-btn icon
                                       :disabled="temperature.awaitingResponse"
                                       :loading="temperature.awaitingResponse"
                                       @click="temperature.decrement()">
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col>
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
                            <v-col>
                                <v-btn icon
                                       :disabled="temperature.awaitingResponse"
                                       :loading="temperature.awaitingResponse"
                                       @click="temperature.increment()">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </v-col>

                            <v-col ><!--class="pr-10" -->
                                <v-btn text @click="extraControllers.changeState()">{{extraControllers.message}}</v-btn>
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
    import {
        BooleanStatus,
        DeviceEventHandler,
        ExtraControls,
        NumberFieldWithButtons,
        SelectionField,
        getLocation
    } from "../../assets/js/DevicesLib";

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
                location: getLocation(this.props),
                eventHandler: new DeviceEventHandler(this.props),

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

        mounted() {
            let actions = [
                    this.mode.getActionLoaderObject(),
                    this.swing.vertical.getActionLoaderObject(),
                    this.swing.horizontal.getActionLoaderObject(),
                    this.fan.getActionLoaderObject(),
                    this.temperature.getActionLoaderObject(),
            ];

            lib.loadAllSupportedValues(this.props.type.id, actions);
        },
    }
</script>

<style scoped>

</style>