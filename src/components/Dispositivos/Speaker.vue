<template>
    <v-card :id="`#${props.id}`" shaped raised>
        <v-container class="pt-0">
            <v-row dense>
                <v-col cols="12" class="px-5">
                    <disp-info
                            :device="props"
                            :state="state"
                    ></disp-info>
                </v-col>
                <v-col cols="12" class="px-5">
                    <v-container fluid class="py-0 px-0"> <!--class="px-3 py-0" -->
                        <v-row align="center" dense justify="space-around"><!--class="my-0 py-0" -->
                            <v-col>
                                <v-switch
                                        color="#72E1C7"
                                        hide-details="true"
                                        v-model="status.value"
                                        @change="changeStatus"
                                        :loading="status.awaitingResponse"
                                        :disabled="status.awaitingResponse">
                                </v-switch><!--class="px-3 my-auto" -->
                            </v-col>
                            <v-col>
                                <v-btn icon @click="skipSong(false)" :loading="awaitingSongChange" :disabled="stopped || paused || awaitingSongChange">
                                    <v-icon color="#6563FF">mdi-skip-previous</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-btn icon :disabled="stopped || mode.awaitingResponse" :loading="mode.awaitingResponse"
                                       rounded class="mx-1" @click="mode.changeState()">
                                    <v-icon color="#6563FF">{{playPauseIcon}}</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-btn icon @click="skipSong(true)" :loading="awaitingSongChange" :disabled="!playing || awaitingSongChange">
                                    <v-icon color="#6563FF">mdi-skip-next</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col ><!--class="pr-10" -->
                                <v-btn color="#6563FF" text @click="controllerHandler()">{{extraControllers.message}}<v-icon>{{extraControllers.icon}}</v-icon></v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
                <v-col cols="12" class="px-5">
                    <v-form v-model="volume.validInput">
                        <v-slider
                                color="#65C0AB"
                                thumb-color="#65C0AB"
                                track-color="#A8DED1"
                                prepend-icon="mdi-volume-medium"
                                :disabled="volume.awaitingResponse"
                                :loading="volume.awaitingResponse"
                                v-model="volume.value"
                                @change="volume.changeState()"
                                class="align-center"
                                :max='volume.maxValue'
                                :min='volume.minValue'
                                thumb-label
                                ticks
                                tick-size="2"
                                hide-details>
                        </v-slider>
                    </v-form>
                </v-col>
            </v-row>
            <v-row dense v-show="extraControllers.value">
                <v-col cols="12" class="px-5">
                    <v-container class="py-0">
                        <v-row align="baseline" justify="start">
                            <v-col cols="3">
                                <v-list-item class="px-0">
                                    <v-list-item-content>
                                        <v-list-item-title class="subtitle-1">Genero</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                            <v-col class="py-0"> <!--class="pr-10" -->
                                <v-select
                                        v-model="genre.value"
                                        :items="getTranslation(genre.supportedValues)"
                                        @change="changeGenre"
                                        hide-details
                                        :loading="genre.awaitingResponse"
                                        :disabled="genre.awaitingResponse"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
<!--                    -->
<!--                    <v-container fluid class="py-0">-->
<!--                        <v-row align="center" justify="start">-->
<!--                            <v-col cols="3" class="py-0 px-0">-->
<!--                                <v-select-->
<!--                                        v-model="genre.value"-->
<!--                                        :items="genre.supportedValues"-->
<!--                                        label="Genero"-->
<!--                                        @change="changeGenre"-->
<!--                                        :loading="genre.awaitingResponse"-->
<!--                                        :disabled="genre.awaitingResponse"-->
<!--                                ></v-select>-->
<!--                            </v-col>-->
<!--                        </v-row>-->
<!--                    </v-container>-->
                </v-col>
                <v-col cols="12" class="px-5">
                    <v-container fluid class="py-0">
                        <v-row>
                            <v-col class="py-0 px-0">
                                <v-list > <!--class="px-7" -->
                                    <v-list-item-title class="title">Lista de reporduccion:</v-list-item-title>
                                    <v-list-item-group color="primary">
                                        <v-list-item v-for="song in this.playlist" :key="song.title" dense>
                                            <v-list-item-icon>
                                                <v-icon>mdi-minus</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>{{song.artist}} - {{song.title}}</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>

    import DispInfo from "./DispInfo";
    import Device from "../../assets/js/Device";
    import {
        BooleanStatus,
        ButtonStatus,
        ExtraControls,
        NumberField, SelectionField
    } from "@/assets/js/DevicesLib";
    const lib = require("../../assets/js/lib")

    export default {
        name: "speaker",
        components:{DispInfo},
        props: {
            props: {
                type: Device,
                required: true
            }
        },
        data(){
            return{
                iconInfo:lib.getIconInfo(this.props.type.name),
                extraControllers: new ExtraControls(),
                statePolling: null,

                status: new BooleanStatus(this.props,'status','play','stop','playing','stopped'),
                mode: new ButtonStatus(this.props, 'status', 'resume', 'pause', 'playing', 'paused'),
                volume: new NumberField(this.props, 'volume', 'setVolume'),
                genre: new SelectionField(this.props, 'genre', 'setGenre'),

                awaitingSongChange: false,
                playlist: null
            }
        },
        computed:{
            state(){
                let song = this.props.state.song;
                if(this.stopped || !song)
                    return 'Off';
                else if(this.paused)
                    return `${song.progress}/${song.duration} - ${song.title} - Vol. ${this.props.state.volume}`;
                return `${song.progress}/${song.duration} - ${song.title} - Vol. ${this.props.state.volume}`;
            },
            playPauseIcon(){
                return (this.playing)? 'mdi-pause' : 'mdi-play';
            },
            playing() {
                return this.props.state.status === 'playing';
            },
            stopped(){
                return this.props.state.status === 'stopped';
            },
            paused(){
                return this.props.state.status === 'paused';
            }
        },
        methods:{
            handleDispInfoEvents(event){
                this.eventHandlers[event.eventName](this);
            },
            controllerHandler(){
                this.extraControllers.value = ! this.extraControllers.value;
                if(this.extraControllers.value)
                    this.extraControllers.message = 'Menos';
                else
                    this.extraControllers.message = 'Mas';
            },
            changeGenre(){
                this.genre.awaitingResponse = true;
                this.props.execute(this.genre.action, [this.genre.value])
                    .then( response => {
                        response.result && (this.props.state.genre = this.value);
                        this.refreshPlaylist(false);
                    })
                    .catch(console.log)
                    .finally( () => this.genre.awaitingResponse = false);
            },
            refreshPlaylist(reorder = true){
                this.props.execute('getPlaylist')
                    .then( data => {
                            this.playlist = data.result;
                            if(reorder)
                                this.updatePlaylistBeginning();
                    })
                    .catch(console.log);
            },
            skipSong(next = true){
                this.awaitingSongChange = true;
                let action = next? 'nextSong' : 'previousSong';
                this.props.execute(action)
                    .then( response => {
                        if(response.result){
                            if(next)
                                this.playlist.push(this.playlist.shift());
                            else
                                this.playlist.unshift(this.playlist.pop());
                        }
                    })
                    .catch(console.log)
                    .finally(() => this.awaitingSongChange = false)
            },
            changeStatus(){
                this.mode.value = this.status.value;
                this.status.changeState();
            },
            updatePlaylistBeginning(){
                if(this.props.state.song){
                    let song = this.props.state.song.title;
                    let i = this.playlist.length;
                    while (i > 0 && this.playlist[0].title !== song) {
                        this.playlist.push(this.playlist.shift());
                        i--;
                    }
                }
            },
            stateChangeHandler(newState){
                this.status.value = (this.playing || this.paused);

                this.mode.value = this.playing;

                this.volume.value = newState.volume;

                if(this.genre.value !== newState.genre){
                    this.genre.value = newState.genre;
                    this.refreshPlaylist();
                } else
                    this.updatePlaylistBeginning();
            },
            getTranslation(baseArray){
                if(baseArray)
                    return baseArray.map(entry => {return {value: entry, text: this.$vuetify.lang.t(`$vuetify.${entry}`)}})
            }
        },
        mounted(){
            this.status.value = (this.playing || this.paused);

            this.mode.value = this.playing;

            this.refreshPlaylist();

            let actions = [
                this.volume.getActionLoaderObject(),
                this.genre.getActionLoaderObject()
            ];
            lib.loadAllSupportedValues(this.props.type.id, actions);

            this.statePolling = lib.setStatePolling.call(this, this.stateChangeHandler.bind(this), 1000);
        },
        beforeDestroy() {
            if(this.statePolling)
                clearInterval(this.statePolling);
        }
    }
</script>

<style scoped>

</style>