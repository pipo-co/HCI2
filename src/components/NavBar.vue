<template>
    <v-app-bar fixed color="#72E1C7">
        <v-row align="center" justify="center">
            <v-col cols="3">
                <v-toolbar-title color="3C3F58">SMARTIFY</v-toolbar-title>
            </v-col>
            <v-col cols="4"></v-col>
            <v-col cols="1" class="px-0">
                <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="4" class="px-0">
<!--                <v-btn text to="/">Favoritos</v-btn>-->
<!--                <v-btn text to="/homes">Hogares</v-btn>-->
<!--                <v-btn text>Rutinas</v-btn>-->
<!--                <v-btn text>Consumos</v-btn>-->
                <v-tabs right color="#3C3F58" background-color="#72E1C7">
                    <v-tabs-slider color="#87FFE3"></v-tabs-slider>
                    <v-tab to="/favoritos">Favoritos</v-tab>
                    <v-tab to="/">Hogares</v-tab>
                    <v-tab to="/rutinas">Rutinas</v-tab>
                    <v-tab>Consumos</v-tab>
                </v-tabs>
            </v-col>
        </v-row>
    </v-app-bar>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>

</style>