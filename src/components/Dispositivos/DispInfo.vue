<template>
    <v-container fluid class="py-0 px-0">
        <v-row align="center">
            <v-col cols="2" class="py-0 px-0">
                <v-avatar :color="iconInfo.bgColor">
                    <v-icon :color="iconInfo.color">{{iconInfo.src}}</v-icon>
                </v-avatar>
            </v-col>
            <v-col cols="7">
                <v-list class="mx-auto">
                    <v-list-item-group >
                        <v-list-item-content class="py-0">
                            <v-list-item-subtitle>{{location}}</v-list-item-subtitle>
                            <v-list-item-title class="title d-inline-block text-truncate text--darken-1 indigo--text">{{device.getName()}}</v-list-item-title>
                            <v-list-item-subtitle v-if="state" class="text--primary">{{state}}<slot name="state"></slot></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item-group>
                </v-list>
            </v-col>

            <v-col cols="3" class="pl-0">
                <v-btn icon>
                    <v-icon :color="color" @click="this.handleFav">mdi-heart</v-icon>
                </v-btn>
                <v-menu bottom :offset-x="true">
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="(option, index) in overflowOptions"
                                     @click="option.handle()" :key="index">
                            <v-list-item-title>{{option.message}}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-dialog v-model="overflowOptions.delete.dialog" max-width="330">
                    <v-alert class="my-0 pa-0" border="top" colored-border color="red">
                        <v-card-text class="pb-0 display-1">Eliminar dispositivo</v-card-text>
                        <v-card-text>
                            Se perdera toda la informacion vinculada al dispositivo
                        </v-card-text>
                        <v-card tile class="blue-grey lighten-5">
                            <v-card-actions>
                                <v-btn depressed color="white" @click="cancelRemove()">
                                    Cancelar
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="error"  @click="executeRemove()">
                                    Eliminar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-alert>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Device from "../../assets/js/Device";
    import {getIconInfo} from "../../assets/js/lib";
    import {getLocation} from "../../assets/js/DevicesLib";

    export default {
        name: "DispInfo",
        props: {
            device: {
                type: Device,
                required: true
            },
            state: {
                type: String,
                required: false
            },
        },
        data(){
            return{
                iconInfo: getIconInfo(this.device.type.name),
                location: getLocation(this.device),
                removeDevice: false,

                overflowOptions:{
                    edit: {
                        message: 'Editar',
                        eventName: 'edit',
                        handle: () => this.$router
                            .push({ name: 'editardispositivo', params: { edit: 'true', device: this.device}}),
                    },
                    history: {
                        message: 'Historial',
                        eventName: 'history',
                        handle: () => this.$router.push({name: 'deviceLog', params: {deviceId: this.device.id}}),
                    },
                    delete: {
                        message: 'Eliminar',
                        eventName: 'delete',
                        dialog: false,
                        handle: () => this.overflowOptions.delete.dialog = true,
                    },
                }
            }
        },
        computed:{
            color(){
                if(this.device.isFav())
                    return 'red';
                return 'disable';
            }
        },
        methods:{
            cancelRemove(){
                this.overflowOptions.delete.dialog = false;
            },
            executeRemove(){
                this.overflowOptions.delete.dialog = false;
                this.device.delete()
                    .then(this.removeFromDom)
                    .catch(error => console.log(`Load all supported values: ${error}`));
            },
            handleFav(){
                if (this.device.isFav())
                    this.device.unFav();
                else
                    this.device.fav();
            },
            removeFromDom(wasCascade){
                if(wasCascade && this.$route.name === 'room')
                    this.$router.push({name: 'homes'});
                else{
                    this.device.isDeleted = true;
                    let elem = document.getElementById(`#${this.device.id}`).parentNode;
                    elem.parentNode.removeChild(elem);
                }
            }
        }

    }
</script>

<style scoped>
    .v-list-item__content{
        text-align: left;
    }
</style>