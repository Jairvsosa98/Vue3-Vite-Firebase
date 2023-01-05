<script setup>
import { reactive } from "vue";
import { useUserStore } from "../stores/user";
import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css";

const userStore = useUserStore();

const formState = reactive({
    password: "1234567",
    email: "jairvs@gmail.com",
});

const onFinish = async (values) => {
    const res = await userStore.loginUser(formState.email, formState.password);
    if(!res) {
        message.success('Bienvenido a la super apps')
    }
    if (res === "auth/wrong-password") {
        message.error("credenciales no válidas");
    }
};

const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};
</script>

<template>

    <a-row>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
            <a-form layout="vertical" name="basicLogin" autocomplete="off" :model="formState" @finish="onFinish">
                <a-form-item label="Email" name="email"
                    :rules="{ required: true, whitespace: true, type: 'email', message: 'Ingresa tu email válido' }">
                    <a-input type="email" placeholder="Ingrese Email" v-model:value="formState.email"></a-input>
                </a-form-item>
                <a-form-item label="Password" name="password"
                    :rules="{ required: true, min: 6, whitespace: true, message: 'Ingresa una contraseña con mínimo 6 carácteres' }">
                    <a-input-password v-model:value="formState.password"></a-input-password>
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button :loading="userStore.loadingUser" :disabled="userStore.loadingUser" type="primary"
                        html-type="submit">Acceder</a-button>
                </a-form-item>
            </a-form>
        </a-col>

    </a-row>
</template>