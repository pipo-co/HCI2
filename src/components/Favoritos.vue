<template>
    <v-container >
        <v-row justify="center">
            <v-col md="8">
                <v-row>
<!--                    <v-col md="6" v-for="disp in dispositivos" :key="disp.id">-->
<!--                        <dispositivo :disp="disp"></dispositivo>-->
<!--                    </v-col>-->
                    <v-col md="6">
                        <dispositivo></dispositivo>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    // import Parlante from "./Dispositivos/Parlante";
    import Dispositivo from "./Dispositivos/Dispositivo";
    export default {
        name: "Favoritos",
        components: {Dispositivo},
        computed: {
            dispositivos: function () {
                return ''
            }
        }
    }
</script>

<style scoped>

</style>