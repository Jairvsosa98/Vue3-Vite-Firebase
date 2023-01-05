<script setup>
import { useUserStore } from "../stores/user";
import { message } from "ant-design-vue";
import { ref } from "vue";

const userStore = useUserStore()
const fileList = ref([])

const onFinish = async () => {
    const res = await userStore.updateUser(userStore.userData.displayName)

    if (fileList.value[0]) {
        const res = await userStore.updateImage(fileList.value[0])
        if (res) {
            return message.error('Hubo un error al subir la imágen')
        }
    }

    if (!res) {
        return message.success('Se actualizó tu información de perfil')
    }
    message.error('Ocurrió un error al actualizar el perfil')
}
const beforeUpload = (file) => {
    fileList.value = [...fileList.value, file]

    return false
}
const handleRemove = file => {
    const index = fileList.value.indexOf(file);
    const newFileList = fileList.value.slice();
    newFileList.splice(index, 1);
    fileList.value = newFileList;
};
const handleChange = info => {

    // Validar los tipos de imagenes
    if (info.file.status !== 'uploading') {
        const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Solo puedes subir imágenes con formato .png y .jpg');
            handleRemove(info.file)
            return;
        }
        const isLt2M = info.file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Solo puedes subir imágenes de 2MB ');
            handleRemove(info.file)
            return;
        }

    }
    // Si el user sube otra, se reemplazará
    let resFileList = [...info.fileList];
    // Valida que sea solo una imagen
    resFileList = resFileList.slice(-1);
    resFileList = resFileList.map(file => {
        if (file.response) {
            file.url = file.response.url;
        }
        return file;
    });
    fileList.value = resFileList;
};
</script>

<template>
    <div>
        <h1>Perfil de usuario</h1>
        <div class="text-center mb-5 ">
            <a-avatar class="shadow-gray o-fit" :size="{ xs: 50, sm: 80, md: 100, lg: 150, xl: 180 }"
                :src="userStore.userData.photoURL" />
        </div>
        <a-row>
            <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
                <a-form layout="vertical" name="basicPerfil" autocomplete="off" :model="userStore.userData"
                    @finish="onFinish">
                    <a-form-item label="Tu Correo (no modfiicable)" name="email"
                        :rules="{ required: true, whitespace: true, type: 'email', message: 'Ingresa tu email válido' }">
                        <a-input disabled type="email" placeholder="Ingrese Email"
                            v-model:value="userStore.userData.email"></a-input>
                    </a-form-item>
                    <a-form-item label="Ingrese su Nickname" name="displayName"
                        :rules="{ required: true, whitespace: true, message: 'Ingresa un nick válido' }">
                        <a-input type="text" placeholder="Ingrese NickName"
                            v-model:value="userStore.userData.displayName"></a-input>
                    </a-form-item>
                    <a-upload class="mb-5" v-model:file-list="fileList" list-type="picture"
                        :before-upload="beforeUpload" @change="handleChange" @remove="handleRemove">
                        <a-button>Subir Foto Perfil</a-button>
                    </a-upload>

                    <a-form-item class="mt-5">
                        <a-button :loading="userStore.loadingUser" :disabled="userStore.loadingUser" type="primary"
                            html-type="submit">Actualizar Información</a-button>
                    </a-form-item>
                </a-form>
            </a-col>
        </a-row>
    </div>
</template>

<style>
.mb-5 {
    margin-bottom: 2rem;
}

.mt-5 {
    margin-top: 2rem;
}

.shadow-gray {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.o-fit img {
    object-fit: contain;
}
</style>
