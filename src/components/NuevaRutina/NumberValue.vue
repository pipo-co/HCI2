<template>
    <v-container class="py-0">
        <v-row>
            <v-col class="pr-4">
                <v-form v-model="validInput">
                    <v-slider
                            color="#65C0AB"
                            thumb-color="#65C0AB"
                            track-color="#A8DED1"
                            v-model="value"
                            @input="emit()"
                            class="align-center"
                            :max='maxValue'
                            :min='minValue'
                            hide-details>
                        <template v-slot:prepend>
                            <v-card-text>{{$vuetify.lang.t(`$vuetify.${params.name}`)}}</v-card-text>
                        </template>
                        <template v-slot:append>
                            <v-text-field
                                    class="inputNumber"
                                    v-model="value"
                                    @change="emit()"
                                    :rules="rules"
                                    solo rounded flat outlined dense
                            ></v-text-field>
                        </template>
                    </v-slider>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "NumberValue",
        props:{
            params:{
                type: Object,
                require: true,
            }
        },
        data(){
            return{
                supportedValues: this.params.supportedValues,
                validInput: true,
                minValue: this.params.minValue,
                maxValue: this.params.maxValue,
                value: this.params.minValue,
                rules: [
                    entry => /[0-9]+/.test(entry) || "El valor debe ser un numero",
                    entry => entry >= this.minValue || "Valor por debajo del minimo",
                    entry => entry <= this.maxValue || "Valor por arriba del maximo",
                ],
            }
        },
        methods:{
            emit(){
                if(this.validInput)
                    this.$emit('change', this.value);
            }
        }
    }
</script>

<style scoped>

</style>