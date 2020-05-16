<template>
    <v-row no-gutters dense>
        <v-col cols="12" class="px-5">
            <disp-info
                    :name="disp.name"
                    state="Reproduciendo cachenge"
                    room="Living"
                    :icon="iconInfo"
                    :fav="false"
            ></disp-info>
        </v-col>
        <v-col md="12"  class="px-5">
            <v-container fluid class="py-0"> <!--class="px-3 py-0" -->
                <v-row align="center" dense justify="space-around"><!--class="my-0 py-0" -->
                    <v-col cols="1" class="ma-0 pa-0">
                        <v-switch></v-switch><!--class="px-3 my-auto" -->
                    </v-col>
                    <v-col cols="1" class="ma-0 pa-0">
                        <v-btn icon true>
                            <v-icon color="primary" >mdi-weather-sunny</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="7" class="ma-0 pa-0">
                        <v-slider class="mt-5"></v-slider>
                    </v-col>
                    <v-col cols="2" class="ma-0 pa-0"><!--class="pr-10" -->
                        <v-btn text >Menos</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-col>
        <v-col md="12"  class="px-5">
            <v-container fluid class="py-0"> <!--class="px-3 py-0" -->
                <v-row align="center" dense justify="space-around">
                    <v-col cols="12">
                        <v-list-item class="px-0">
                            <v-list-item-content class="ma-1 pa-1">
                                <v-list-item-title align="left" class="title">Seleccione Color</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                    <v-col cols="12">
                        <color-picker class="ma-auto" v-bind="color" @input="onInput"></color-picker>
                    </v-col>
                </v-row>
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
import ColorPicker from '@radial-color-picker/vue-color-picker';
import DispInfo from "./DispInfo";
export default {
    name:"lamp",
    props: {
        disp: {
            type: Object,
            required: true
        }
    },
    components: { ColorPicker, DispInfo},
    data() {
        return {
            color: {
                hue: 50,
                saturation: 100,
                luminosity: 50,
                alpha: 1
            },
            iconInfo:{
                bgColor: '#FFFBDB',
                color: '#E9D94D',
                src:'mdi-lightbulb-outline  '
            }
        };
    },
    methods: {
        onInput(hue) {
            this.color.hue = hue;
        },
    },
};
</script>

<style scoped>
    @import '~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';
</style>