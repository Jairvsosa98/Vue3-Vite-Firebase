<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useDatabaseStore } from '../stores/database'

const route = useRoute()
const databaseStore = useDatabaseStore()

const url = ref('')

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
    // validación de la url
    if (validarURL(url.value)) {

        databaseStore.updateUrl(route.params.id, url.value)
    } else {
        console.log('Url no válido')
    }
}

onMounted(async () => {
    url.value = await databaseStore.leerUrl(route.params.id)
})

</script>

<template>
    <div>
        <h1>Editar id: {{ route.params.id }}</h1>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese URL" v-model="url">
            <button type="submit">Editar</button>
        </form>
    </div>
</template>