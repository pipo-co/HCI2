<template>

    <v-row dense>
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
            <v-container class="py-0">
                <v-row align="center" justify="left">
                    <v-col cols="3">
                        <p>Modo:</p>
                    </v-col>
                    <v-col cols="9">
                            <v-card flat class="py-12">
                                <v-card-text>
                                    <v-row>
                                        <v-btn-toggle v-model="toggle_exclusive" rounded dense>
                                            <v-btn text>Frío</v-btn>
                                            <v-btn text>Calor</v-btn>
                                            <v-btn text>Ventilación</v-btn>
                                        </v-btn-toggle>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                </v-row>
            </v-container>
            <v-container>
            <v-row>
                <p>Desplazamiento de aspas</p>
                    <v-row align="center" justify="center">
                        <v-col>
                            <v-card flat class="py-12">
                                <v-card-text>
                                    <p>Vertical:</p>
                                    <v-row>
                                        <v-btn-toggle v-model="toggle_exclusive" rounded dense>
                                            <v-btn text>Auto</v-btn>
                                            <v-btn text>22</v-btn>
                                            <v-btn text>45</v-btn>
                                            <v-btn text>67</v-btn>
                                            <v-btn text>90</v-btn>
                                        </v-btn-toggle>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row align="center" justify="center">
                        <v-col>
                            <v-card flat class="py-12">
                                <v-card-text>
                                    <p>Horizontal:</p>
                                    <v-row>
                                        <v-btn-toggle v-model="toggle_exclusive" rounded dense>
                                            <v-btn text>Auto</v-btn>
                                            <v-btn text>-90</v-btn>
                                            <v-btn text>-45</v-btn>
                                            <v-btn text>0</v-btn>
                                            <v-btn text>45</v-btn>
                                            <v-btn text>90</v-btn>
                                        </v-btn-toggle>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <p>Velocidad Ventilador:</p>
                    <v-row align="center" justify="center">
                        <v-col>
                            <v-card flat class="py-12">
                                <v-card-text>
                                    <p>Horizontal:</p>
                                    <v-row>
                                        <v-btn-toggle v-model="toggle_exclusive" rounded dense>
                                            <v-btn text>Auto</v-btn>
                                            <v-btn text>25</v-btn>
                                            <v-btn text>50</v-btn>
                                            <v-btn text>75</v-btn>
                                            <v-btn text>100</v-btn>
                                        </v-btn-toggle>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-row>
            </v-container>
        </v-col>
    </v-row>

</template>

<script>
    export default {
        name: "Aire"
    }
</script>

<style scoped>

</style>