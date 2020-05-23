import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)


import Homes from "@/components/Homes";


const routes = [
    {
        component: () => import(/* webpackChunkName: "Favoritos" */"@/components/Favoritos"),
        name: "favoritos",
        path: "/favoritos",
    },
    {
        component: Homes,
        name: "homes",
        path: "/"
    },
    {
        component: () => import(/* webpackChunkName: "Rutinas" */"@/components/Rutinas"),
        name: "rutinas",
        path: "/rutinas"
    },
    {
        component: () => import(/* webpackChunkName: "NuevaRutina" */"@/components/NuevaRutina/NuevaRutina"),
        name: "nuevarutina",
        path: "/rutinas/nuevarutina"
    },
    {
        component: () => import(/* webpackChunkName: "NuevoDispositivo1" */"@/components/NuevoDispositivo/NuevoDispositivo1"),
        name: "nuevodispositivo",
        path: "/dispositivo/nuevodispositivo1/:previousRoute/:homeID/:roomID"
    },
    {
        component: () => import(/* webpackChunkName: "NuevoDispositivo1" */"@/components/NuevoDispositivo/NuevoDispositivo1"),
        name: "nuevodispositivo1",
        path: "/dispositivo/nuevodispositivo1"
    },
    {
        component: () => import(/* webpackChunkName: "ViewRoom" */"@/components/ViewRoom"),
        name: "room",
        path: "/room/:homeID/:roomID",
    },
    {
        component: () => import(/* webpackChunkName: "ViewDeviceType" */"@/components/ViewDeviceType"),
        name: "deviceType",
        path: "/deviceType/:homeID/:deviceTypeName",
    },
    {
        component: () => import(/* webpackChunkName: "DeviceLog" */"@/components/DeviceLog"),
        name: "deviceLog",
        path: "/deviceLog/:deviceId"
    },
    {
        component: () => import(/* webpackChunkName: "Search" */"@/components/Search"),
        name: "search",
        path: "/search/:name"
    },
    {
        component: () => import(/* webpackChunkName: "PageNotFound" */"../components/PageNotFound"),
        name: "pageNotFound",
        path: "*"
    }

];

export default new VueRouter({
   routes
});