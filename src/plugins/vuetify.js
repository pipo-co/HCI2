import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import es from '../assets/js/spanishDictionary'

Vue.use(Vuetify,{
    iconfont:'mdi'
})

const opts = {
    lang: {
        locales: {es},
        current: 'es',
    }
}

export default new Vuetify(opts)
