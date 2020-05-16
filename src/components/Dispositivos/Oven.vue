<template>
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
                <v-row align="center" dense justify="space-around"><!--class="my-0 py-0" -->
                    <v-col>
                        <v-switch v-model="isOn" dense></v-switch><!--class="px-3 my-auto" -->
                    </v-col>
                    <v-col>
                        <v-btn icon >
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn text small>180ºC</v-btn>
                    </v-col>
                    <v-col>
                        <v-btn icon >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col ><!--class="pr-10" -->
                        <v-btn text >Menos</v-btn>
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
                                <v-list-item-title align="left" class="subtitle-1">Fuente Calor</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                    <v-col class="py-0"> <!--class="pr-10" -->
                        <v-select :items="fuentesDeCalor" dense value="Convencional"></v-select>
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
                        <v-select :items="grill" v-model="stateVars.grill" dense value="Convencional"></v-select>
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
                        <v-select :items="conveccion" dense value="Convencional"></v-select>
                    </v-col>
                </v-row>
            </v-container>
        </v-col>
    </v-row>
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
              stateVars:{
                  isOn: '',
                  heat: '',
                  grill: '',
                  convection: '',
                  temperature: '',
              },
              fuentesDeCalor: [],
              grill: [],
              conveccion: [],
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
                this.fuentesDeCalor = action.params[0].supportedValues;

                action = data.result.actions.filter(act => act.name === 'setGrill')[0];
                this.grill = action.params[0].supportedValues;

                action = data.result.actions.filter(act => act.name === 'setConvection')[0];
                this.conveccion = action.params[0].supportedValues;

            }).catch(error => {
                console.log(`Error ${error}`);
            })
        },
        watch:{
            isOn: function() {
                if (this.isOn){
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
            }
        }
    }
</script>

<style scoped>

</style>