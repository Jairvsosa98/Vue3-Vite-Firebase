import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from './stores/user'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Editar from './views/Editar.vue'

const requireAuth = async (to, from, next) => {
    const userStore = useUserStore()
    userStore.loadingSession = true
    const user = await userStore.currentUser()
    if (user) {
        next()
    } else {
        next('/login')
    }
    userStore.loadingSession = false
}

const routes = [
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register }, 
    { path: '/', name: 'home', component: Home, beforeEnter: requireAuth },
    { path: '/editar/:id', name: 'editar', component: Editar, beforeEnter: requireAuth },

]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;