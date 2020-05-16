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
            <v-container fluid class="py-0 px-0"> <!--class="px-3 py-0" -->
                <v-row align="center" dense justify="center"><!--class="my-0 py-0" -->
                    <v-col>
                        <v-btn-toggle v-model="toggle_exclusive" rounded dense>
                            <v-btn text>abrir</v-btn>
                            <v-btn text>cerrar</v-btn>
                            <v-btn text>bloquear</v-btn>
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
        name: "door",
        components:{DispInfo},
        props: {
            argv: {
                type: Object,
                required: true

            }
        }
    }
</script>

<style scoped>

</style>