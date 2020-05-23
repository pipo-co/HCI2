import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)


import Homes from "@/components/Homes";



const routes = [
    {
        component: () => import("@/components/Favoritos"),
        name: "favoritos",
        path: "/favoritos",
    },
    {
        component: Homes,
        name: "homes",
        path: "/"
    },
    {
        component: () => import("@/components/Rutinas"),
        name: "rutinas",
        path: "/rutinas"
    },
    {
        component: () => import("@/components/NuevaRutina/NuevaRutina"),
        name: "nuevarutina",
        path: "/rutinas/nuevarutina"
    }, {
        component: () => import("../components/NuevoDispositivo/NuevoDispositivo1"),
        name: "editardispositivo",
        path: "/dispositivo/nuevodispositivo1/:edit/:id/:typeid/:deviceName/"
    },

    {
        component: () => import("../components/NuevoDispositivo/NuevoDispositivo1"),
        name: "nuevodispositivo",
        path: "/dispositivo/nuevodispositivo1/:previousRoute/:homeID/:roomID"
    },
    {
        component: () => import("../components/NuevoDispositivo/NuevoDispositivo1"),
        name: "nuevodispositivo1",
        path: "/dispositivo/nuevodispositivo1"
    },
    {
        component: () => import("../components/ViewRoom"),
        name: "room",
        path: "/room/:homeID/:roomID",
    },
    {
        component: () => import("../components/ViewDeviceType"),
        name: "deviceType",
        path: "/deviceType/:homeID/:deviceTypeName",
    },
    {
        component: () => import("../components/DeviceLog"),
        name: "deviceLog",
        path: "/deviceLog/:deviceId"
    },
    {
        component: () => import("../components/Search"),
        name: "search",
        path: "/search/:name"
    },
    {
        component: () => import("../components/PageNotFound"),
        name: "pageNotFound",
        path: "*"
    }

];

export default new VueRouter({
   routes
});