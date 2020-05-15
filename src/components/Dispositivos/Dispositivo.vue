<template>
    <v-card class="disp">
        <v-container >
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
            </v-row>
            <component :is="dispType" argv="hola"/>
        </v-container>
    </v-card>
</template>

<script>
    import DispInfo from "./DispInfo";
    import Aire from "./Aire";
    import Parlante from "./Parlante";
    import Aspiradora from "./Aspiradora";
    import Puerta from "./Puerta";
    import Regador from "./Regador";
    import Horno from "./Horno";
    import Persiana from "./Persiana";
    import Lampara from "./Lampara";

    export default {
        name: "dispositivo",
        // props: {
        //     disp: {
        //         type: Object,
        //         required: true
        //     },
        // },
        components:{
            DispInfo, Parlante, Aire, Aspiradora, Puerta, Regador, Horno, Persiana, Lampara
        },
        data() {
            return {
                dispType: 'aire'
            }

        }
    }
</script>

<style scoped>

</style>