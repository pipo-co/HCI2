<template>
    <v-container >
        <v-row justify="center">
            <v-col cols="12" xl="8">
                <v-container>
                    <v-row v-if="cards">
                        <v-col v-for="index in 2" class="px-0" cols="6" :key="index">
                            <v-container>
                                <v-row>
                                    <v-col class="py-3" cols="12" v-for="card in cards[index - 1]" :key="card.id">
                                        <card-router :card="card"></card-router>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import CardRouter from "./Dispositivos/CardRouter";

    export default {
        name: "CardHolder",
        components: {CardRouter},
        data(){
            return{
                cards: null,
            }
        },
        props: {
            cardArray: {
                type: Array,
                require: true,
            }
        },
        mounted() {
            this.cards = [];
            this.cards[0] = [];
            this.cards[1] = [];
            this.cardArray.forEach((entry,index) => this.cards[index % 2].push(entry));
        }
    }
</script>

<style scoped>

</style>