<template>
    <v-container fluid class="py-0 px-0">
        <v-row align="center">
            <v-col cols="9" class="py-0 px-0" align="start">
                <v-list-item class="pr-0">
                    <v-list-item-avatar :color="icon.bgColor" >
                        <v-icon large :color="icon.color">{{icon.src}}</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-subtitle>{{room}}</v-list-item-subtitle>
                        <v-list-item-title class="title d-inline-block text-truncate">{{name}}</v-list-item-title>
                        <v-list-item-subtitle class="text--primary">{{state}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-col>

            <v-col align="end" class="pl-0">
                <v-btn icon>
                    <v-icon :color="color" @click="eventDispatcher('fav')">mdi-heart</v-icon>
                </v-btn>


                <v-menu bottom :offset-x="true">
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="(option, index) in overflowOptions"
                                     @click="eventDispatcher(option.eventName)" :key="index">
                            <v-list-item-title>{{option.message}}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "DispInfo",
        props:{
            icon : {
                required: true
            },
            name: {
                type: String,
                required: true
            },
            room:{
                type: String,
                required: true
            },
            state:{
                type: String,
                required: true
            },
            fav:{
                type: Boolean,
                required: true,
            }
        },
        data(){
            return{
                overflowOptions:{
                    editar: {
                        message: 'Editar',
                        eventName: 'edit'
                    },
                    historial: {
                        message: 'Historial',
                        eventName: 'history'
                    },
                    eliminar: {
                        message: 'Eliminar',
                        eventName: 'delete'
                    },
                }
            }
        },
        computed:{
            color(){
                if(this.fav)
                    return 'red';
                return 'disable';
            }
        },
        methods:{
            eventDispatcher(eventName){
                this.$emit('disp-event', {eventName: eventName})
            },
        }

    }
</script>

<style scoped>

</style>