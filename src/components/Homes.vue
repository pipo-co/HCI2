<template>
    <v-container>
        <v-row align="stretch"  justify="center">
            <v-col cols="10">
                <v-card
                        class="mx-auto"
                        width="60%"
                >
                    <v-tabs background-color="transparent" color="basil" grow>
                        <v-tab>Casa</v-tab>
                        <v-tab>Oficina</v-tab>
                        <v-tab>Casa Costa</v-tab>
                    </v-tabs>

                    <v-container fluid>
                        <v-row>
                            <v-col>
                                <v-card raised>
                                    <v-carousel
                                            :continuous="false"
                                            height="300"
                                            hide-delimiter-background
                                            show-arrows-on-hover
                                    >
                                        <v-carousel-item>
                                            <v-sheet height="100%">
                                                <v-row class="fill-height" align="center" justify="center">
                                                    <div class="display-3">Slide 1</div>
                                                </v-row>
                                            </v-sheet>
                                        </v-carousel-item><v-carousel-item>
                                        <v-sheet height="100%">
                                            <v-row class="fill-height" align="center" justify="center">
                                                <div class="display-3">Slide 2</div>
                                            </v-row>
                                        </v-sheet>
                                    </v-carousel-item>
                                    </v-carousel>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Homes"
    }
</script>

<style scoped>

</style>