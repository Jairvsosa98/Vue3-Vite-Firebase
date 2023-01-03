<script setup>
import { useUserStore } from '../stores/user'
import { useDatabaseStore } from '../stores/database'
import Spinner from '../components/Spinner.vue';
import { useRouter } from 'vue-router'
import { message } from "ant-design-vue";

const userStore = useUserStore()
const databaseStore = useDatabaseStore()
const router = useRouter()

databaseStore.getUrls()

const confirm = async (id) => {
    const res = await databaseStore.deleteUrl(id)
    if(!res) return message.success('Se eliminó con éxito')
    return message.error(res)
    
}
const cancel = () => {
    message.error('No se eliminó')
}



</script>

<template>
    <div>
        <h1>Home</h1>
        <p>{{ userStore.userData?.email }}</p>
        <add-form></add-form>
        <Spinner v-if="databaseStore.loadingDoc"></Spinner>
        <a-space v-if="!databaseStore.loadingDoc" direction="vertical" style="width: 100%">
            <a-card v-for="item of databaseStore.documents" :key="item.id" :title="item.short">
                <template #extra>
                    <a-space>
                        <a-popconfirm title="¿Estás seguro que deseas eliminar el enlace?" ok-text="Sí" cancel-text="No"
                            @confirm="confirm(item.id)" @cancel="cancel">
                            <a-button danger :loading="databaseStore.loading" :disabled="databaseStore.loading">Eliminar</a-button>
                        </a-popconfirm>

                        <a-button type="primary" @click="router.push(`/editar/${item.id}`)">Editar</a-button>
                    </a-space>

                </template>
                <p>{{ item.name }}</p>
            </a-card>
        </a-space>

    </div>
</template>
