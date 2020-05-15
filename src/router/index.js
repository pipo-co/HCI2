import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

import Favoritos from "@/components/Favoritos";
import Homes from "@/components/Homes";
import Rutinas from "@/components/Rutinas";

const routes = [
    {
        component: Favoritos,
        name: "favoritos",
        path: "/",
    },
    {
        component: Homes,
        name: "homes",
        path: "/homes"
    },
    {
        component: Rutinas,
        name: "rutinas",
        path: "/rutinas"
    }
];

export default new VueRouter({
   routes
});