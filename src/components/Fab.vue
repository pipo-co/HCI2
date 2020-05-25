<template>
    <v-speed-dial
            class="mr-12 mb-10"
            v-model="fab"
            right
            bottom
            fixed
            direction="top"
            transition="scale-transition">
        <template v-slot:activator>
            <v-btn large v-model="fab" color="#72E1C7" dark fab>
                <v-icon large color="#3C3F58" v-if="fab">mdi-close</v-icon>
                <v-icon large color="#3C3F58" v-else>mdi-plus</v-icon>
            </v-btn>
        </template>
        <v-tooltip disabled nudge-left="25" left :value="true">
            <template v-slot:activator="{ on }">
                <v-btn :to="{ name: 'nuevarutina' }" v-on="on" fab dark small color="white">
                    <v-icon color="#3C3F58">mdi-clipboard-list-outline</v-icon>
                </v-btn>
            </template>
            <span>Registrar Rutina</span>
        </v-tooltip>
        <v-tooltip disabled nudge-left="25" left :value="true">
            <template v-slot:activator="{ on }">
                <v-btn :to="{ name:'nuevodispositivo1'}" v-on="on" fab dark small color="white">
                    <v-icon color="#3C3F58">mdi-plus</v-icon>
                </v-btn>
            </template>
            <span>Registrar Dispositivo</span>
        </v-tooltip>
    </v-speed-dial>
</template>

<script>
    export default {
        name: "Fab",
        data(){
            return {
                fab: false
            }
        }
    }
</script>

<style scoped>

</style>