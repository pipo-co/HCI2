<template>
    <div>
        <v-container class="pa-2">
            <v-row no-gutters class=" ma-1 pa-0">
                <v-col cols="12" md="12">
                    <v-btn rounded>Editar Hogares</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-card elevation="5" class="mx-auto rounded"
                width="800"
                height="1100"
        >
            <v-container class="py-0 my-0">
                <v-row class="py-0 my-0">
                    <v-tabs class="top-rounded"
                            fixed-tabs
                            background-color="#65C2AD"
                            dark
                    >
                        <v-tabs-slider color="black"></v-tabs-slider>
                        <v-tab>
                            Casa
                        </v-tab>
                        <v-tab>
                            Oficina
                        </v-tab>
                        <v-tab>
                            Costa
                        </v-tab>
                    </v-tabs>
                </v-row>
                <v-row class="py-2 my-1" >
                    <v-col cols="12" md="12" >
                        <h1 class="headline ma-0 pa-0 text-center">Tipos de dispositivo</h1>
                    </v-col>
                </v-row>
                <v-row>
                    <v-card elevation="3" class="mx-auto rounded"
                            width="700"
                            height="150"
                    >
                        <v-container fluid>
                        <v-carousel
                                hide-delimiters
                                show-arrows-on-hover
                                height="150"
                        >
                            <v-carousel-item v-for="j in (0,2)" :key="j">
                                    <v-row align="center" wrap no-gutters>
                                        <v-col v-for="(dispositive, i) in dispositives" :key="dispositive.name" cols="4" md="4">
                                            <v-list-item :key="i" v-if="(j===1)? i<6: i>=6">
                                                <v-avatar class="mr-2">
                                                    <img :src="require(`@/assets/${dispositive.img}`)">
                                                </v-avatar>
                                                <v-list-item-content class="py-3 px-0">
                                                    <v-list-item-title align="left" class="headline black--text pt-1 pb-2 ">{{dispositive.name}}</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-col>
                                    </v-row>
                            </v-carousel-item>
                        </v-carousel>
                        </v-container>
                    </v-card>

                </v-row>
                <v-row class="py-2 my-1">
                    <v-col cols="12" md="12" >
                        <h1 class="headline ma-0 pa-0 text-center">Habitaciones</h1>
                    </v-col>
                </v-row>

                <v-row v-for="room in homerooms" :key="room.name" class="my-4 rounded">
                    <v-card flat elevation="4"
                            class="ma-auto "
                            width="750"
                            height="80"
                    >
                        <v-container fluid class="pa-0 ma-1">
                            <v-row align="center" no-gutters>
                                <v-col cols="1" class="pa-0 ma-1">
                                    <v-btn class="pa-0 ma-1" text>
                                        <v-icon>mdi-overflow</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="5" md="5">
                                    <h1 class="headline ml-3 " align="left" >{{room.name}}</h1>
                                </v-col>
                                <v-col cols="3" md="3">
                                    <v-spacer></v-spacer>
                                </v-col>
                                <v-col v-for="dispositive in room.disp" :key="dispositive.name" cols="1" md="1">
                                    <v-list-item>
                                        <v-list-item-avatar class="mx-1" >
                                            <img :src="dispositive.img">
                                        </v-list-item-avatar>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="1" md="1" >
                                    <v-icon color="#65C2AD" large class="px-4">mdi-chevron-right</v-icon>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-row>
            </v-container>
        </v-card>
    </div>
    <!--<v-container>
        <v-row align="stretch"  justify="center">
            <v-col cols="10">
                <v-card
                        class="mx-auto"
                        width="60%"
                >
                    <v-tabs background-color="transparent" color="basil" grow>
                        <v-tab>Casa</v-tab>
                        <v-tab>Oficina</v-tab>
                        <v-tab>Casa Costa</v-tab>
                    </v-tabs>

                    <v-container fluid>
                        <v-row>
                            <v-col>
                                <v-card raised>
                                    <v-carousel
                                            :continuous="false"
                                            height="300"
                                            hide-delimiter-background
                                            show-arrows-on-hover
                                    >
                                        <v-carousel-item>
                                            <v-sheet height="100%">
                                                <v-row class="fill-height" align="center" justify="center">
                                                    <div class="display-3">Slide 1</div>
                                                </v-row>
                                            </v-sheet>
                                        </v-carousel-item><v-carousel-item>
                                        <v-sheet height="100%">
                                            <v-row class="fill-height" align="center" justify="center">
                                                <div class="display-3">Slide 2</div>
                                            </v-row>
                                        </v-sheet>
                                    </v-carousel-item>
                                    </v-carousel>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>-->
</template>

<script>
    export default {
        name: "Homes",
        data() {
            return {
                dispositives: [
                    {name: "Luces", img: 'lampara.png', iconcolor: "#E9D94D", backcolor: "#FFFBDB"},
                    {name: "Hornos", img: 'horno.png', iconcolor: "#C01616", backcolor: "#FFBBBB"},
                    {name: "Aires", img: 'aire.png', iconcolor: "#FFC700", backcolor: "#FFF3C8"},
                    {name: "Parlantes", img: 'parlante.png', iconcolor: "#6563FF", backcolor: "#E1E0FE"},
                    {name: "Regadores", img: 'regador.png', iconcolor: "#BF38FF", backcolor: "#F2D6FF"},
                    {name: "Aspiradoras", img: 'aspiradora.png', iconcolor: "#0091B1", backcolor: "#BEF3FF"},
                    {name: "Regadores", img: 'regador.png', iconcolor: "#BF38FF", backcolor: "#F2D6FF"},
                    {name: "Aspiradoras", img: 'aspiradora.png', iconcolor: "#0091B1", backcolor: "#BEF3FF"}
                ]
            }
        }
    }
</script>

<style scoped>
    .rounded{
        border-radius: 25px;
    }
    .v-card.rounded.v-sheet{
        border-radius: 25px;
    }
    .top-rounded{
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
    }
    .border-dashed{
        border-radius: 25px 25px 25px 25px;
        -moz-border-radius: 25px 25px 25px 25px;
        -webkit-border-radius: 25px 25px 25px 25px;
        border: 3px dashed #a6a6a6;
    }
</style>