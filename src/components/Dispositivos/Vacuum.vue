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
                    <v-col >
                        <v-switch dense></v-switch><!--class="px-3 my-auto" -->
                    </v-col>
                    <v-col>
                        <v-btn-toggle v-model="toggle_exclusive" rounded dense>
                            <v-btn text>pausar</v-btn>
                            <v-btn text>aspirar</v-btn>
                            <v-btn text>trapear</v-btn>
                            <v-btn text>cargar</v-btn>
                        </v-btn-toggle>
                    </v-col>
                    <v-col align="end">
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
                                <v-list-item-title align="left" class="title">Habitacion:</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                    <v-col md="8" class="py-0"> <!--class="pr-10" -->
                        <v-select :items="habitaciones" dense value="Living"></v-select>
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
                                <v-list-item-title align="left" class="title">Cargador:</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                    <v-col md="8" class="py-0"> <!--class="pr-10" -->
                        <v-select :items="habitaciones" dense value="Living"></v-select>
                    </v-col>
                </v-row>
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
    import DispInfo from "./DispInfo";

    export default {
        name: "vacuum",
        components:{DispInfo},
        props: {
            disp: {
                type: Object,
                required: true
            }
        },
        computed:{
            state(){
                return ''
            }
        }
    }
</script>

<style scoped>

</style>