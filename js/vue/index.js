import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'

import routes from './src/routes'
import App from './src/pages/App'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)

console.log(routes)

const router = new VueRouter({
	mode:'hash',
	routes:routes
})
router.map(routes)

router.start(App,'#app')