<template>
    <v-container >
        <v-row justify="center">
            <v-col md="8">
                <v-row>
                    <v-col md="6" v-for="disp in dispositivos" :key="disp.id">
                        <dispositivo :type="disp.type.name" :disp="disp"></dispositivo>
                    </v-col>
<!--                    <v-col md="6">-->
<!--                        <dispositivo></dispositivo>-->
<!--                    </v-col>-->
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Dispositivo from "./Dispositivos/Dispositivo";
    import Api from "@/assets/js/Api.js"
    // import device from "@/assets/js/Device.js"

    export default {
        name: "Favoritos",
        components: {Dispositivo},
        data(){
            return{
                dispositivos: []
                }
        },
        mounted(){
            console.log('mounted')
            console.log(Api.baseUrl);

            Api.device.getAll().then(data => {
                this.dispositivos = data.result;
                console.log('Response');
                console.log(data.result);
            }).catch(error => {
                console.log(`Error ${error}`);
            })
            //
            // var hornoloco = new device(null,'Hornoloco',{id:'im77xxyulpegfmv8'},{});
            // api.device.add(hornoloco).then(data =>{
            //     hornoloco.id = data.result.id;
            // }).catch(error => {
            //     console.log(`Error ${error}`);
            // })
        },
        computed: {
        }
    }
</script>

<style scoped>

</style>