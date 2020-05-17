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
                    ></disp-info>
                </v-col>
                <v-col cols="12" class="px-5">
                    <v-container fluid class="py-0 px-0"> <!--class="px-3 py-0" -->
                        <v-row align="center" dense justify="center" ><!--class="my-0 py-0" -->
                            <v-col>
                                <v-btn-toggle rounded dense>
                                    <v-btn text>Subir</v-btn>
                                    <v-btn text>Bajar</v-btn>
                                </v-btn-toggle>
                            </v-col>
                            <v-col align="end">
                                <v-btn text @click="controllerHandler()">{{extraControllers.message}}</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
            <v-row  dense v-show="extraControllers.value">
                <v-col cols="12" class="px-5">
                    <v-card-text>
                        <v-row>
                            <v-col >
                                <v-list-item class="px-0">
                                    <v-list-item-content class="ma-1 pa-1">
                                        <v-list-item-subtitle class="title">Seleccione Posicion:</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="pr-4">
                                <v-slider
                                        v-model="level.sliderValue"
                                        class="align-center"
                                        :max='level.maxValue'
                                        :min='level.minValue'
                                        hide-details>
                                    <template v-slot:append>
                                        <v-text-field
                                                class="inputNumber"
                                                v-model="level.textFieldValue"
                                                solo rounded flat outlined dense
                                                :rules="level.validate"
                                        ></v-text-field>
                                    </template>
                                </v-slider>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    import DispInfo from "./DispInfo";
    import Device from "@/assets/js/Device";
    const lib = require("../../assets/js/lib");

    export default {
        name: "Blinds",
        components:{DispInfo},
        props: {
            props: {
                type: Device,
                required: true
            }
        },
        data(){
            return{
                iconInfo:{
                    bgColor: '#f2d6ff',
                    color: '#BF38FF',
                    src:'mdi-window-shutter'
                //    mdi-blinds
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
                level:{
                    textFieldValue: 0,
                    sliderValue: 0,
                    minValue: 0,
                    maxValue: 0,
                    action: 'setLevel',
                    validate:
                        [
                            level => /[0-9]+/.test(level) || "La temperatura debe ser un numero",
                            level => level >= this.level.minValue || "Valor por debajo del minimo",
                            level => level <= this.level.maxValue || "Valor por arriba del maximo",
                        ]
                },
            }
        },
        watch: {
          'level.sliderValue'(){
              this.level.textFieldValue = this.level.sliderValue;
          },
            'level.textFieldValue'(){
              this.level.sliderValue = this.level.textFieldValue;
            }
        },
        computed: {
            state() {
                if (this.props.state.level >= 90)
                    return 'Abierta';
                else if (this.props.state.level >=30)
                    return 'Entreabierta';
                else
                    return 'Cerrada';
            },
            location() {
                return `${this.props.room.home.name} - ${this.props.room.name}`
            },
        },
        methods: {
            loadSupportedLevels(params){
              this.level.minValue = params[0].minValue;
              this.level.maxValue = params[0].maxValue;
              this.level.sliderValue = this.props.state.level;
              this.level.textFieldValue = this.props.state.level;
            },
            controllerHandler() {
                this.extraControllers.value = !this.extraControllers.value;
                if (this.extraControllers.value)
                    this.extraControllers.message = 'Menos';
                else
                    this.extraControllers.message = 'Mas';
            }
        },
        mounted(){
            lib.deviceTypeActionParams(this.props.type.id, this.level.action)
                .then(this.loadSupportedLevels)
                .catch(errors => console.log(`Level - Supported Values ${errors}`));
            console.log(this.props.state.level);
            console.log(this.level.textFieldValue);
            console.log(this.level.sliderValue);
        }
    }
</script>

<style scoped>

</style>