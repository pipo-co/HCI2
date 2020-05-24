<template>
    <v-app>
        <div class="my-0 pt-10" id="app">
            <router-view></router-view>
        </div>
    </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
}
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        background-image: url("assets/bg.png");
        background-repeat: no-repeat;
        background-attachment: fixed;
}
</style>
