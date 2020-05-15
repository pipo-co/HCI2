<template>
    <v-row dense>
        <v-col cols="12" class="px-5">
            <v-container fluid class="py-0 px-0"> <!--class="px-3 py-0" -->
                <v-row align="center" dense justify="center"><!--class="my-0 py-0" -->
                    <v-col >
                        <v-switch dense></v-switch><!--class="px-3 my-auto" -->
                    </v-col>
                    <v-col>
                        <v-btn-toggle v-model="toggle_exclusive" rounded dense>
                            <v-btn text>ml</v-btn>
                            <v-btn text>cl</v-btn>
                            <v-btn text>dl</v-btn>
                            <v-btn text>l</v-btn>
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
                    <v-col class="pr-4">
                        <v-slider
                                v-model="slider"
                                class="align-center"
                                prepend-icon="mdi-water"
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
    export default {
        name: "Regador",
        argv: {
            type: Object,
            required: true

        }
    }
</script>

<style scoped>

</style>