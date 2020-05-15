import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
    {
        component: () => import(/*webpackChunkName:  "Favoritos"*/ "@/components/Favoritos"), //Lazy import
        name: "favoritos",
        path: "/",
    },
    {
        component: () => import(/*webpackChunkName:  "Hogares"*/ "@/components/Homes"),
        name: "homes",
        path: "/homes"
    }
];

export default new VueRouter({
   routes
});