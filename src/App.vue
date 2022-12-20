<script setup>
import Spinner from './components/Spinner.vue';
import {useUserStore} from './stores/user'

const userStore = useUserStore()
</script>

<template>
  <div v-if="!userStore.loadingSession">
    <h1>App Base</h1>
    <nav>
      <router-link v-if="userStore.userData" to="/">Home</router-link> |
      <router-link v-if="!userStore.userData" to="/login">Login</router-link> |
      <router-link v-if="!userStore.userData" to="/register">Register</router-link> |
      <button @click="userStore.logoutUser">Logout</button>
    </nav>


    <router-view></router-view>
  </div>
  
  <Spinner v-else />
</template>