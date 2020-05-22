<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" xl="8">
                <v-row>
                    <v-col md="6" v-for="card in cardArray" :key="card.id"> <!-- usar index en ves de card id-->
                        <card-router :card="card"></card-router>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import CardRouter from "./Dispositivos/CardRouter";

    export default {
        name: "CardHolder",
        components: {CardRouter},
        props: {
            cardArray: {
                type: Array,
                require: true,
            }
        }
    }
</script>

<style scoped>

</style>