<script setup>
import Spinner from './components/Spinner.vue';
import { useUserStore } from './stores/user'
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const route = useRoute()

const selectedKeys = ref([route.name])

watch(() => route.name, () => selectedKeys.value = [route.name])


</script>

<template>
  <a-layout>
    <a-layout-header v-if="!userStore.loadingSession">

      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="home" v-if="userStore.userData">
          <router-link to="/">Home</router-link>
        </a-menu-item>
        <a-menu-item key="perfil" v-if="userStore.userData">
          <router-link to="/perfil">Perfil</router-link>
        </a-menu-item>
        <a-menu-item key="login" v-if="!userStore.userData">
          <router-link to="/login">Login</router-link>
        </a-menu-item>
        <a-menu-item key="register" v-if="!userStore.userData">
          <router-link to="/register">Register</router-link>
        </a-menu-item>
        <a-menu-item key="logout" v-if="userStore.userData" @click="userStore.logoutUser">
          Logout
        </a-menu-item>
      </a-menu>

    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <Spinner v-if="userStore.loadingSession" />
        <router-view></router-view>
      </div>

    </a-layout-content>

  </a-layout>

</template>

<style>
.container {
  background-color: #fff;
  padding: 24px;
  min-height: calc(100vh - 64px);
}
.text-center {
  text-align: center;
}
</style>
