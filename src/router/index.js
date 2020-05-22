import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)


import Homes from "@/components/Homes";

import NewDisp from "@/components/NuevoDispositivo/NuevoDispositivo1";

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
    },
    {
        component: () => import("@/components/NuevaRutina/NuevaRutina1"),
        name: "nuevarutina1",
        path: "/rutinas/nuevarutina1"
    },
    {
        component: NewDisp,
        name: "nuevodispositivo1",
        path: "/dispositivo/nuevodispositivo1"
    },
    {
        component: NewDisp,
        path: "/dispositivo/nuevodispositivo1/:homeId/:roomId"
    },
    {
        component: () => import("../components/ViewRoom"),
        name: "room",
        path: "/room/:roomID",
    },
    {
        component: () => import("../components/ViewDeviceType"),
        name: "deviceType",
        path: "/deviceType/:homeID/:deviceTypeID",
    },
    {
        component: () => import("../components/DeviceLog"),
        name: "deviceLog",
        path: "/deviceLog/:deviceId"
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