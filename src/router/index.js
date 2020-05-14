import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

import Favoritos from "@/components/Favoritos";
import Homes from "@/components/Homes";

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
    }
];

export default new VueRouter({
   routes
});