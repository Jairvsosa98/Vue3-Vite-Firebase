import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from './stores/user'
import { useDatabaseStore } from './stores/database'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Editar from './views/Editar.vue'
import Perfil from './views/Perfil.vue'
import NotFound from './views/NotFound.vue'

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

const redirection = async (to, from, next) => {
    const databaseStore = useDatabaseStore()
    const userStore = useUserStore()

    userStore.loadingSession = true

    const name = await databaseStore.getUrl(to.params.pathMatch[0])
    if(!name){
        next()
        userStore.loadingSession = false
    }else {
        window.location.href = name
        userStore.loadingSession = true
        next()
    }
    
}

const routes = [
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },

    { path: '/', name: 'home', component: Home, beforeEnter: requireAuth },
    { path: '/editar/:id', name: 'editar', component: Editar, beforeEnter: requireAuth },

    { path: '/perfil', name: 'perfil', component: Perfil, beforeEnter: requireAuth },
    { path: '/:pathMatch(.*)*', name: '404', component: NotFound, beforeEnter: redirection },

]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;