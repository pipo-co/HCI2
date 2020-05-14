<template>
    <v-container >
        <v-row justify="center">
            <v-col md="8">
                <v-row>
                    <v-col md="6" v-for="n in (0,2)" :key="n">
                        <v-expansion-panels multiple="true">
                            <v-expansion-panel v-for="n in (1,10)" :key="n" class="ma-1">
                                <v-expansion-panel-header>
                                    <v-list-item>
                                        <v-list-item-avatar>
                                            <v-img src="src/assets/aire.png"></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-subtitle>living</v-list-item-subtitle>
                                            <v-list-item-title>Aire Acondicionado</v-list-item-title>
                                            <v-list-item-subtitle class="text--primary">Estado</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-card flat="true">
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn icon>
                                                <v-icon>mdi-heart</v-icon>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-card flat="true">
                                        <v-card-actions>
                                            <v-switch v-model="switch1"></v-switch>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-expansion-panel-content>
                            </v-expansion-panel >
                        </v-expansion-panels>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Favoritos",
    }
</script>

<style scoped>

</style>