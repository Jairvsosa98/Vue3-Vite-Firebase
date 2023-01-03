<script setup>
import { reactive } from 'vue';
import { regExpUrl } from "../utils/regExpUrl";
import { useDatabaseStore } from '../stores/database'
import { message } from "ant-design-vue";

const databaseStore = useDatabaseStore()

const formState = reactive({
    url: ''
})

const onFinish = async (value) => {

    const res = await databaseStore.addUrl(formState.url)
    if (!res) {
        formState.url = ''
        return message.success('URL agregada satisfacotoriamente')
    }

    switch (res) {
        //Buscar errores de firestore
        default:
            message.error("Ocurrió un error en el servidor, inténtelo de nuevo.");
            break;
    }

}

</script>

<template>
    <a-form name="addForm" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish">
        <a-form-item name="url" label="Ingrese una Url" :rules="[{
    required: true,
    whitespace: true,
    pattern: regExpUrl,
    message: 'Ingrese una URL válida'
}]">
            <a-input v-model:value="formState.url"></a-input>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" html-type="submit" :loading="databaseStore.loading" :disabled="databaseStore.loading">Agregar URL</a-button>
        </a-form-item>
    </a-form>
</template>