<template>
    <v-container class="py-0">
        <v-row align="baseline" justify="start">
            <v-col cols="3">
                <v-list-item class="px-0">
                    <v-list-item-content>
                        <v-list-item-title class="subtitle-1">{{actionName}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
            <v-col class="py-0">
                <v-select :items="supportedValues" v-model="value" @change="$emit('change', value)"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

    export default {
        name: "SupportedValues",
        props:{
          actionName:{
              type: String,
              require: true,
          },
          params:{
              type: Object,
              require: true,
          }
        },
        data(){
            return{
                value: null,
                supportedValues: this.params.supportedValues,
            }
        }
    }
</script>

<style scoped>

</style>