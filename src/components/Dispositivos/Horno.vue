<template>
    <v-row dense>
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
                        <v-select :items="fuenteCalor" dense value="Convencional"></v-select>
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
                        <v-select :items="fuenteCalor" dense value="Convencional"></v-select>
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
                        <v-select :items="fuenteCalor" dense value="Convencional"></v-select>
                    </v-col>
                </v-row>
            </v-container>
        </v-col>

    </v-row>
</template>

<script>
    export default {
        name: "Horno",
        argv: {
            type: Object,
            required: true

        }
    }
</script>

<style scoped>

</style>