<script setup>
import { useUserStore } from '../stores/user'
import { useDatabaseStore } from '../stores/database'
import Spinner from '../components/Spinner.vue';
import { ref } from 'vue';
import{useRouter} from 'vue-router'

const userStore = useUserStore()
const databaseStore = useDatabaseStore()
databaseStore.getUrls()

const url = ref('')
const router = useRouter()

const validarURL = urlString => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

const handleSubmit = () => {
    // validaciones de esa url...
    if(validarURL(url.value)){
        databaseStore.addUrl(url.value)
        url.value = ''
    }else {
        console.log('Url inválida')
    }

}

</script>

<template>
    <div>
        <h1>Home</h1>
        <p>{{ userStore.userData?.email }}</p>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese URL" v-model="url">
            <button type="submit">Agregar</button>
        </form>
        <Spinner v-if="databaseStore.loadingDoc"></Spinner>
        <ul v-else>
            <li v-for="item of databaseStore.documents" :key="item.id">
                {{ item.id }}
                <br />
                {{ item.name }}
                <br />
                {{ item.short }}
                <br />
                <button @click="databaseStore.deleteUrl(item.id)">Eliminar</button>
                <button @click="router.push(`/editar/${item.id}`)">Editar</button>
            </li>
        </ul>
    </div>
</template>
