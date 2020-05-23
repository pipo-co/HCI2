<template>
    <v-container class="py-0">
        <v-row align="baseline" justify="start">
            <v-col cols="3">
                <v-list-item class="px-0">
                    <v-list-item-content>
                        <v-list-item-title class="subtitle-1">{{params.name}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
            <v-col cols="9">
                <v-color-picker v-model="color" mode="hexa" hide-inputs @input="emit()"></v-color-picker>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

    export default {
        name: "ColorValue",
        props:{
            params:{
                type: Object,
                require: true,
            }
        },
        data(){
            return {
                color: "FFFFFF"
            }
        },
        methods: {
            emit() {
                let hex = this.color.substring(1, 7);
                this.$emit('change', hex);
            }
        },
        watch: {
            color(value) {
                if (value.toString().match(/#[a-zA-Z0-9]{8}/)) {
                    this.color = value.substr(0, 7);
                }
            }
        }
    }
</script>

<style scoped>

</style>