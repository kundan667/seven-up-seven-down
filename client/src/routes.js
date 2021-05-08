import Vue from "vue"
import VueRouter from "vue-router"
//import Loading from "vue-loading-overlay"
//import "vue-loading-overlay/dist/vue-loading.css"

// Routes
import landing from "@/routes/landing"
import index from "@/routes/index"

Vue.use(VueRouter);
//Vue.use(Loading);

let routes = [
    {
        path: '/',
        component: () => import('./layouts/Home'),
        children: [...landing]
    },
    {
        path: '/play-game',
        component: () => import('./layouts/Home'),
        children: [...index]
    }
]

const router = new VueRouter({
    routes,
    // linkActiveClass: 'active',
    mode: 'hash',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
});
let pageLoader;
router.beforeEach((to, from, next) => {
    //pageLoader = Vue.$loading.show()

    return next()
});
// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
    //pageLoader.hide()
});

export default router;