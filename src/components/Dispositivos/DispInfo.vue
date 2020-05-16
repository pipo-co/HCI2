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
                    <v-icon :color="color">mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon >mdi-dots-vertical</v-icon>
                </v-btn>
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
                color: this.fav ? 'red' : 'disable',
            }
        },
        watch:{
            fav(){
                if(this.fav)
                    this.color = 'red';
                else
                    this.color = 'disable';
            }
        }

    }
</script>

<style scoped>

</style>