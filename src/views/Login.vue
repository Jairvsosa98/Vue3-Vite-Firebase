<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user'
// import {useRouter} from 'vue-router'

const email = ref('')
const password = ref('')
const userStore = useUserStore()
// const router = useRouter()

const handleSubmit = async() => {
    if (!email.value || password.value.length < 6 ) {
        return alert('Llena todos los campos')
    }
    await userStore.loginUser(email.value,password.value)
    // router.push('/')
}

</script>

<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Ingrese Email" v-model.trim="email" />
            <input type="password" placeholder="Ingrese Contraseña" v-model.trim="password" />
            <input type="submit" :disabled="userStore.loadingUser" value="Acceder">
        </form>
    </div>
</template>