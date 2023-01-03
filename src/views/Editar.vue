<script setup>
import { onMounted } from 'vue';
import { useRoute,useRouter } from 'vue-router'
import { useDatabaseStore } from '../stores/database'
import { reactive } from 'vue';
import { regExpUrl } from "../utils/regExpUrl";
import { message } from "ant-design-vue";

const route = useRoute()
const router = useRouter()
const databaseStore = useDatabaseStore()

const formState = reactive({
    url: ''
})

const onFinish = async (value) => {

    const res = await databaseStore.updateUrl(route.params.id, formState.url)
    if (!res) {
        formState.url = ''
        return message.success('URL modificada satisfactoriamente')
    }

    switch (res) {
        //Buscar errores de firestore
        default:
            message.error("Ocurrió un error en el servidor, inténtelo de nuevo.");
            break;
    }

}

onMounted(async () => {
    formState.url = await databaseStore.leerUrl(route.params.id)
})

</script>

<template>
    <div>
        <h1>Editar id: {{ route.params.id }}</h1>
        <a-form name="editForm" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish">
            <a-form-item name="url" label="Ingrese una Url" :rules="[{
    required: true,
    whitespace: true,
    pattern: regExpUrl,
    message: 'Ingrese una URL válida'
}]">
                <a-input v-model:value="formState.url"></a-input>
            </a-form-item>
            <a-form-item>
                <a-space>
                    <a-button type="primary" html-type="submit" :loading="databaseStore.loading"
                        :disabled="databaseStore.loading">Editar URL</a-button>
                    <a-button @click="router.push('/')">Volver</a-button>
                </a-space>

            </a-form-item>
        </a-form>
    </div>
</template>