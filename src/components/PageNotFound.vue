<template>
    <div>
        <v-app-bar fixed color="#72E1C7">
            <v-row align="center" justify="start">
                <v-col>
                    <v-btn @click="$router.push('/')" text>
                        <v-toolbar-title class="headline teal--text text--darken-4 font-weight-bold" color="#3C3F58" to="/">SMARTIFY</v-toolbar-title>
                    </v-btn>
                </v-col>
            </v-row>
        </v-app-bar>
        <v-row align="center" justify="center">
            <v-col cols="auto" class="justify-center align-center">
                <v-img class="ma-auto" src="../assets/404.png" height="50%" width="50%"></v-img>
            </v-col>
        </v-row>
        <p class="display-1">Oh no! Página no encontrada</p>
        <p class="display-1">Clickea en SMARTIFY para volver al inicio</p>
    </div>
</template>

<script>
    export default {
        name: "pageNotFound"
    }
</script>

<style scoped>

</style>