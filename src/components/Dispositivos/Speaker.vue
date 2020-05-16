<template>
    <v-card class="disp">
        <v-container >
            <v-row dense>
                <v-col cols="12" class="px-5">
                    <disp-info
                            :name="props.name"
                            :state="state"
                            :room="location"
                            :icon="iconInfo"
                            :fav="this.props.isFav()"
                    ></disp-info>
                </v-col>
                <v-col cols="12" class="px-5">
                    <v-container fluid class="py-0 px-0"> <!--class="px-3 py-0" -->
                        <v-row align="center" dense justify="space-around"><!--class="my-0 py-0" -->
                            <v-col>
                                <v-switch dense></v-switch><!--class="px-3 my-auto" -->
                            </v-col>
                            <v-col>
                                <v-btn icon >
                                    <v-icon>mdi-skip-previous</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-btn icon >
                                    <v-icon>mdi-play</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-btn icon >
                                    <v-icon>mdi-skip-next</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col ><!--class="pr-10" -->
                                <v-btn text @click="controllerHandler()">{{extraControllers.message}}</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
                <v-col cols="12" class="px-5">
                    <v-slider dense v-model="media"  prepend-icon="mdi-volume-medium"></v-slider>
                </v-col>
            </v-row>
            <v-row dense v-show="extraControllers.value">
                <v-col cols="12" class="px-5">
                    <v-container fluid class="py-0">
                        <v-row align="center" justify="start">
                            <v-col cols="3" class="py-0 px-0">
                                <v-list-item class="px-0">
                                    <v-list-item-content>
                                        <v-list-item-title class="title" align="left">Genero:</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col class="py-0"> <!--class="pr-10" -->
                                <v-select :items="items" dense value="Pop"></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
                <v-col cols="12" class="px-5">
                    <v-container fluid class="py-0">
                        <v-row>
                            <v-col class="py-0 px-0">
                                <v-list > <!--class="px-7" -->
                                    <v-list-item-title class="title" align="left">Lista de reporduccion:</v-list-item-title>
                                    <v-list-item-group color="primary">
                                        <v-list-item v-for="i in (0,3)" :key="i">
                                            <v-list-item-icon>
                                                <v-icon>mdi-minus</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title align="left">Nombre de cancion</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>

    import DispInfo from "./DispInfo";
    import Device from "../../assets/js/Device";

    export default {
        name: "speaker",
        components:{DispInfo},
        props: {
            props: {
                type: Device,
                required: true
            }
        },
        data(){
            return{
                iconInfo:{
                    bgColor: '#E1E0FE',
                    color: '#6563FF',
                    src:'mdi-speaker'
                },
                extraControllers: {
                    value: false,
                    message: 'Mas',
                },
            }
        },
        computed:{
            state(){
                return this.props.state.status;
            },
            location(){
                return `${this.props.room.home.name} - ${this.props.room.name}`
            }
        },
        methods:{
            controllerHandler(){
                this.extraControllers.value = ! this.extraControllers.value;
                if(this.extraControllers.value)
                    this.extraControllers.message = 'Menos';
                else
                    this.extraControllers.message = 'Mas';
            },
        }



    }
</script>

<style scoped>

</style>