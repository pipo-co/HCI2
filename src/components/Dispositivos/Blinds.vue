<template>
    <v-row dense>
        <v-col cols="12" class="px-5">
            <disp-info
                    :name="disp.name"
                    state="Reproduciendo cachenge"
                    room="Living"
                    :icon="iconInfo"
                    :fav="false"
            ></disp-info>
        </v-col>
        <v-col cols="12" class="px-5">
            <v-container fluid class="py-0 px-0"> <!--class="px-3 py-0" -->
                <v-row align="center" dense justify="center" ><!--class="my-0 py-0" -->
                    <v-col>
                        <v-btn-toggle  v-model="toggle_exclusive" rounded dense>
                            <v-btn text>Subir</v-btn>
                            <v-btn text>Bajar</v-btn>
                        </v-btn-toggle>
                    </v-col>
                    <v-col align="end">
                        <v-btn text >Menos</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-col>
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
                                v-model="slider"
                                class="align-center"
                                max="100"
                                min="0"
                                hide-details>
                            <template v-slot:append>
                                <v-text-field
                                        v-model="slider"
                                        class="mt-0 pt-0"
                                        hide-details
                                        single-line
                                        type="number"
                                        style="width: 60px"
                                ></v-text-field>
                            </template>
                        </v-slider>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-col>
    </v-row>
</template>

<script>
    import DispInfo from "./DispInfo";
    export default {
        name: "Blinds",
        components:{DispInfo},
        props: {
            disp: {
                type: Object,
                required: true
            }
        },
        data(){
            return{
                slider: 5,
                toggle_exclusive: 'subir',
                iconInfo:{
                    bgColor: '#f2d6ff',
                    color: '#BF38FF',
                    src:'mdi-window-shutter'
                //    mdi-blinds
                }
            }
        }
    }
</script>

<style scoped>

</style>