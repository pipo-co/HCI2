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
                        <v-switch dense></v-switch><!--class="px-3 my-auto" -->
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
                <v-row align="center" justify="left">
                    <v-col cols="3">
                        <v-list-item class="px-0">
                            <v-list-item-content>
                                <v-list-item-title align="left" class="subtitle-1">Fuente Calor</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                    <v-col class="py-0"> <!--class="pr-10" -->
                        <v-select dense value="Convencional"></v-select>
                    </v-col>
                </v-row>
            </v-container>
        </v-col>
        <v-col cols="12" class="px-5">
            <v-container class="py-0">
                <v-row align="center" justify="left">
                    <v-col cols="3">
                        <v-list-item class="px-0">
                            <v-list-item-content>
                                <v-list-item-title align="left" class="subtitle-1">Modo Grill</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                    <v-col class="py-0"> <!--class="pr-10" -->
                        <v-select dense value="Convencional"></v-select>
                    </v-col>
                </v-row>
            </v-container>
        </v-col>
        <v-col cols="12" class="px-5">
            <v-container class="py-0">
                <v-row align="center" justify="left">
                    <v-col cols="3">
                        <v-list-item class="px-0">
                            <v-list-item-content>
                                <v-list-item-title align="left" class="subtitle-1">Conveccion</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                    <v-col class="py-0"> <!--class="pr-10" -->
                        <v-select  dense value="Convencional"></v-select>
                    </v-col>
                </v-row>
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
    import DispInfo from "./DispInfo";
    import device from "../../assets/js/Device";

    export default {
        name: "oven",
        components:{DispInfo},
        props: {
            disp: {
                type: device,
                required: true
            }
        },
        data(){
          return{
              iconInfo:{
                  bgColor: '#FFBBBB',
                  color: '#C01616',
                  src:'mdi-stove'
              }
          }
        },
        computed:{
            state(){
                if(this.disp.state.status === 'off')
                    return 'Off'
                return `Prendido: ${this.disp.state.heat} ${this.disp.state.temperature}º`
            }
        }
    }
</script>

<style scoped>

</style>