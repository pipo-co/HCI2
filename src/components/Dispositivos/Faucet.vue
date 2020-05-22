<template>
    <v-card>
        <v-container>
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
                    <v-container fluid class="py-0 px-0"> <!--class="px-3 py-0" -->
                        <v-row align="baseline" dense justify="center"> <!--class="my-0 py-0" -->
                            <v-col cols="4">
                                <v-select
                                        dense rounded outlined
                                        v-model="dispense.selectedUnit"
                                        :items="dispense.unitSupportedValues"
                                        label="Unidad"
                                ></v-select>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="4" class="justify-end">
                                <v-btn text color="#6563FF" @click="invertState()" :loading="booleanStatus.awaitingResponse" :disabled="booleanStatus.awaitingResponse" >{{invertedState}}</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
                <v-col cols="12" class="px-5 py-0">
                    <v-row align="baseline">
                        <v-col class="py-0">
                            <v-form v-model="dispense.validInput">
                                <v-slider
                                        color="#65C0AB"
                                        thumb-color="#65C0AB"
                                        track-color="#A8DED1"
                                        v-model="dispense.selectedValue"
                                        class="align-center"
                                        :max="dispense.maxValue"
                                        :min="dispense.minValue"
                                        hide-details>
                                    <template v-slot:prepend>
                                        <v-icon color="#6563FF">
                                            mdi-water
                                        </v-icon>
                                    </template>
                                    <template v-slot:append>
                                        <v-text-field
                                                v-model="dispense.selectedValue"
                                                solo rounded flat outlined dense
                                                type="number"
                                                :rules="dispense.validate"
                                        ></v-text-field>
                                    </template>
                                </v-slider>
                            </v-form>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-0">
                            <v-progress-circular v-show="isDispensing" :value="percentDispense"></v-progress-circular>
                            <v-btn text color="#6563FF" @click="excecuteDispense()" :loading="dispense.awaitingResponse" :disabled="!validDispense || dispense.awaitingResponse">Dispensar</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    import DispInfo from "./DispInfo";
    import Device from "../../assets/js/Device";
    //let moment = require('moment');
    //import Api from "../../assets/js/Api";
    const lib = require("../../assets/js/lib");

    export default {
        name: "faucet",
        components:{DispInfo},
        props: {
            props: {
                type: Device,
                required: true
            }
        },
        data(){
            return {
                iconInfo: lib.getIconInfo(this.props.type.name),
                statePolling: null,
                eventHandlers:{
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
                    value: this.props.state.status === 'closed',
                    actionTrue: 'open',
                    statusFalse: 'closed',
                    statusTrue: 'opened',
                    actionFalse: 'close',
                    awaitingResponse: false
                },
                dispense: {
                    selectedUnit: null,
                    selectedValue:null,
                    unitSupportedValues: null,
                    minValue: null,
                    maxValue: null,
                    action: 'dispense',
                    validInput: true,
                    awaitingResponse: false,
                    validate:
                        [
                            v => /[0-9]+/.test(v) || "Debe ingresar un valor numerico",
                            v => v >= this.dispense.minValue && v <= this.dispense.maxValue || `El valor debe estar entre ${this.dispense.minValue} y ${this.dispense.maxValue}`
                        ]
                }
            }
        },
        computed: {
            state(){
                if(this.props.state.status === 'closed')
                    return 'Cerrado';
                return 'Abierto';
            },
            location(){
                return `${this.props.getHomeName()} - ${this.props.getRoomName()}`;
            },
            invertedState(){
                if(this.props.state.status === 'closed')
                    return 'Abrir';
                return 'Cerrar';
            },
            validDispense(){
                return this.props.state.status === 'closed' && this.dispense.validInput;
            },
            isDispensing(){
                return !!(this.props.state.dispensedQuantity);
            },
            percentDispense(){
                if(this.isDispensing)
                    return Math.floor((this.props.state.dispensedQuantity / this.props.state.quantity) * 100);
                else
                    return 0;
            }
        },
        methods: {
            handleDispInfoEvents(event){
                this.eventHandlers[event.eventName](this);
            },
            loadSupportedDispense(params){
                this.dispense.minValue = params[0].minValue;
                this.dispense.maxValue = params[0].maxValue;
                this.dispense.unitSupportedValues = params[1].supportedValues;
                this.dispense.selectedUnit = this.dispense.unitSupportedValues[0];
                this.dispense.selectedValue = this.dispense.maxValue;
            },
            excecuteAction(action, params){
                this.props.execute(action, params)
                    .then(console.log)
                    .catch( errors => console.log(`${action} -  ${errors}`) );
            },
            invertState(){
                if(this.props.state.status === this.booleanStatus.statusFalse) {
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
            excecuteDispense(){
                if(this.validDispense) {
                    this.dispense.awaitingResponse = true;
                    this.props.execute(this.dispense.action, [this.dispense.selectedValue, this.dispense.selectedUnit])
                        .then( response => response.result && (this.props.state.status = this.booleanStatus.statusTrue))
                        .catch(console.log)
                        .finally( () => this.dispense.awaitingResponse = false);
                }
            },
            stateChangeHandler(newState){
                this.booleanStatus.value = newState.status === 'closed';
            }
        },
        beforeDestroy() {
            if(this.statePolling)
                clearInterval(this.statePolling);
        },
        mounted(){

            this.statePolling = lib.setStatePolling.call(this, this.stateChangeHandler.bind(this));

            let actions = [
                {action: this.dispense.action, handler: this.loadSupportedDispense}
            ];
            lib.loadAllSupportedValues(this.props.type.id, actions);
        }
    }
</script>

<style scoped>

</style>