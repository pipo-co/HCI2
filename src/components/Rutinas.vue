<template>
    <div>
        <nav-bar/>
        <v-alert
                v-model="alert"
                :value="!alert"
                transition="scale-transition"
                dense
                text
                type="success"
                class="ma-auto"
        >
            Rutina {{currentRoutine}} ejecutada correctamente
        </v-alert>
        <v-card v-for="routine in routines" :key="routine.name" elevation="5" class="mx-auto my-2 rounded"
                max-width="750"
                max-height="80"
        >
            <v-container fluid>
                <v-row no-gutters>
                    <v-col cols="1">
                        <v-menu offset-y
                                transition="slide-y-transition"
                                bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn text top fab
                                       v-on="on"
                                >
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item class="pa-0">
                                    <v-dialog
                                            v-model="routineEliminateDialog"
                                            max-width="500px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-btn
                                                    text
                                                    v-on="on"
                                            >
                                                Eliminar
                                            </v-btn>
                                        </template>
                                        <v-card class="rounded">
                                            <v-card-title>
                                                <v-container>
                                                    <v-row align="center" wrap no-gutters>
                                                        <v-col>
                                                            <p class="red--text">¿Esta seguro que quiere borrar la Rutina: {{routine.name}}? </p>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-card-title>
                                            <v-card-actions>
                                                <v-container fluid>
                                                    <v-row align="center">
                                                        <v-col>
                                                            <v-btn
                                                                    color="primary"
                                                                    dark
                                                                    @click="routineEliminateDialog = false"
                                                            >
                                                                Cancelar
                                                            </v-btn>
                                                        </v-col>
                                                        <v-col>
                                                            <v-btn
                                                                    color="red"
                                                                    dark
                                                                    @click="deleteCurrentRoutine(routine.id)"
                                                            >
                                                                Eliminar
                                                            </v-btn>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-col>
                    <v-col cols="5" >
                        <v-list-item dense>
                            <v-list-item-avatar color="#C6FFAB">
                                <v-icon class="ml-2"  flat color="black" large left>mdi-clipboard-list-outline</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title align="left" class="headline pt-1 pb-2 ">{{routine.name}}</v-list-item-title>
                                <v-list-item-subtitle align="left" >{{routine.meta.desc}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                    <v-col align-self="center">
                        <v-card-actions right>
                            <v-spacer></v-spacer>
                            <v-btn rounded color="primary" dark right :loading="auxRoutine[routine.id].loadingFlag" @click="executeRoutine(routine.id, routine.name)">
                                Ejecutar
                                <v-icon >mdi-play</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        <v-container fluid>
            <v-row no-gutters>
                <v-col cols="3">
                    <v-spacer></v-spacer>
                </v-col>
                <v-col align-self="center" justify="center" cols="6">
                    <v-btn height="70" width="750"  class="ma-auto text--secondary border-dashed rounded" :to="{ name: 'nuevarutina' }"  text>
                        <v-icon large dark>mdi-plus</v-icon>
                        Agregar Rutina
                    </v-btn>
                </v-col>
                <v-col cols="3">
                    <v-spacer></v-spacer>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import NavBar from "./NavBar";
    import Api from "../assets/js/Api";
    export default {
        name: "Rutinas",
        components: {NavBar},
        data() {
            return {
                routines: [],
                RoutineEditDialog:false,
                routineEliminateDialog:false,
                currentRoutineID:false,
                currentRoutine: null,
                alert:false,
                auxRoutine: {},
                timeout: 3000,
            }
        },
        mounted() {
            this.getRoutines();
        },
        methods: {
            getRoutines(){
                Api.routine.getAll().then(data => {
                    this.routines = data.result;
                    this.routines.forEach(elem =>{
                        this.auxRoutine[elem.id] = {loadingFlag : false};
                    })
                }).catch(error => {
                    console.log(`Error ${error}`);
                });
            },
            deleteCurrentRoutine(routineID){
                Api.routine.delete(routineID).
                then(()=> this.getRoutines())
                    .catch(error => {
                        console.log(`Error ${error}`);
                    });
            },
            executeRoutine(routineID, title){
                this.auxRoutine[routineID].loadingFlag = true;
                this.currentRoutine = title;
                console.log(routineID);
                Api.routine.execute(routineID)
                    .then( data => {
                        console.log(data);
                        this.getRoutines();


                        setTimeout(function () {
                            this.alert=false;
                        }.bind(this),3000);
                    })
                    .catch(console.log)
                    .finally( () => {
                        this.auxRoutine[routineID].loadingFlag = false;
                        this.alert=true;
                    });
            }
        }
    }
</script>

<style scoped>
    .rounded{
        border-radius: 25px;
    }
    .v-card.rounded.v-sheet{
        border-radius: 25px;
    }
    .top-rounded{
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
    }
    .border-dashed{
        border-radius: 25px 25px 25px 25px;
        -moz-border-radius: 25px 25px 25px 25px;
        -webkit-border-radius: 25px 25px 25px 25px;
        border: 3px dashed #a6a6a6;
    }

</style>