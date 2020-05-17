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
    },
    {
        component: () => import("@/components/NuevaRutina/NuevaRutina1"),
        name: "nuevarutina1",
        path: "/rutinas/nuevarutina1"
    },
    {
        component: () => import("@/components/NuevoDispositivo/NuevoDispositivo1"),
        name: "nuevodispositivo1",
        path: "/dispositivo/nuevodispositivo1"
    }
];

export default new VueRouter({
   routes
});