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
    if (!res) return message.success('Se eliminó con éxito')
    return message.error(res)

}
const cancel = () => {
    message.error('No se eliminó')
}

const copiarPortapapeles = async (id) => {
    console.log(id)
    if (!navigator.clipboard) {
        return message.error('No se pudo copiar al portapapeles.')
    }
    const path = `${window.location.origin}/${id}`

    console.log(path)
    const res = await navigator.clipboard.writeText(path)
    if (res) {
        message.error('No se pudo copiar al portapapeles.')
    } else {
        message.success('Se copió con éxito')
    }

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
                            <a-tooltip color="red">
                                <template #title>Eliminar</template>
                                <a-button danger :loading="databaseStore.loading" :disabled="databaseStore.loading"><i
                                        class="fa-solid fa-trash"></i></a-button>
                            </a-tooltip>
                        </a-popconfirm>

                        <a-tooltip color="geekblue">
                            <template #title>Editar</template>
                            <a-button type="primary" @click="router.push(`/editar/${item.id}`)"><i
                                    class="fa-solid fa-pen-to-square"></i></a-button>
                        </a-tooltip>
                        <a-tooltip>
                            <template #title>Copiar URL</template>
                            <a-button @click="copiarPortapapeles(item.id)"><i class="fa-solid fa-copy"></i></a-button>
                        </a-tooltip>
                    </a-space>

                </template>
                <p>{{ item.name }}</p>
            </a-card>
        </a-space>

    </div>
</template>
