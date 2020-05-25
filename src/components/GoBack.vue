<template>
    <v-btn large icon @click="goBack()">
        <v-icon color="#004D40">mdi-arrow-left</v-icon>
    </v-btn>
</template>

<script>
    export default {
        name: "GoBack",
        methods: {
            goBack(){
                return this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>

</style>