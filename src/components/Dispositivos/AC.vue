<template>

    <v-row dense>
        <v-col cols="12" class="px-5">
            <disp-info
                    name="Equipo de musica"
                    state="Reproduciendo cachenge"
                    room="Living"
                    icon="src/parlante.png"
                    :fav="false"
            ></disp-info>
        </v-col>
        <v-col cols="12" class="px-5">
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
                        <v-btn text small>24ºC</v-btn>
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
            <v-container fluid class="py-0">
                <v-row align="center" justify="left">
                    <v-col class="py-0 px-0">
                        <v-list-item class="px-0">
                            <v-list-item-content>
                                <v-list-item-title class="title" align="left">Modo:</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                    <v-col md="10" class="py-0"> <!--class="pr-10" -->
                        <v-btn-toggle v-model="toggle_exclusive" rounded dense>
                            <v-btn text>Frío</v-btn>
                            <v-btn text>Calor</v-btn>
                            <v-btn text>Ventilación</v-btn>
                        </v-btn-toggle>
                    </v-col>
                </v-row>
            </v-container>
        </v-col>
        <v-col cols="12" class="px-5">
            <v-container fluid class="py-0">
                <v-row align="center" justify="left">
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
        <v-col cols="12" class="px-5">
            <v-container fluid class="py-0">
                <v-row align="center" justify="left">
                    <v-col class="py-0 px-0">
                        <v-list-item class="px-0">
                            <v-list-item-content>
                                <v-list-item-title class="text--primary" align="left">Vertical:</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                    <v-col md="10" class="py-0"> <!--class="pr-10" -->
                        <v-btn-toggle v-model="toggle_exclusive" rounded dense>
                            <v-btn text>Auto</v-btn>
                            <v-btn text>22</v-btn>
                            <v-btn text>45</v-btn>
                            <v-btn text>67</v-btn>
                            <v-btn text>90</v-btn>
                        </v-btn-toggle>
                    </v-col>
                </v-row>
            </v-container>
        </v-col>
        <v-col cols="12" class="px-5">
            <v-container fluid class="py-0">
                <v-row align="center" justify="left">
                    <v-col class="py-0 px-0">
                        <v-list-item class="px-0">
                            <v-list-item-content>
                                <v-list-item-title class="text--primary" align="left">Horizontal:</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                    <v-col md="10" class="py-0"> <!--class="pr-10" -->
                        <v-btn-toggle v-model="toggle_exclusive" rounded dense>
                            <v-btn text>Auto</v-btn>
                            <v-btn text>-90</v-btn>
                            <v-btn text>-45</v-btn>
                            <v-btn text>0</v-btn>
                            <v-btn text>45</v-btn>
                            <v-btn text>90</v-btn>
                        </v-btn-toggle>
                    </v-col>
                </v-row>
            </v-container>
        </v-col>
        <v-col cols="12" class="px-5">
            <v-container fluid class="py-0">
                <v-row align="center" justify="left">
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
        <v-col cols="12" class="px-5">
            <v-container fluid class="py-0">
                <v-row align="center" justify="left">
                    <v-col class="py-0 px-0">
                        <v-list-item class="px-0">
                            <v-list-item-content>
                                <v-list-item-title class="text--primary" align="left">Horizontal:</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                    <v-col md="10" class="py-0"> <!--class="pr-10" -->
                        <v-btn-toggle v-model="toggle_exclusive" rounded dense>
                            <v-btn text>Auto</v-btn>
                            <v-btn text>25</v-btn>
                            <v-btn text>50</v-btn>
                            <v-btn text>75</v-btn>
                            <v-btn text>100</v-btn>
                        </v-btn-toggle>
                    </v-col>
                </v-row>
            </v-container>
        </v-col>
    </v-row>

</template>

<script>
    import DispInfo from "./DispInfo";

    export default {
        name: "ac",
        components:{DispInfo},
        props: {
            disp: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>