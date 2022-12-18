import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBHBjfFjhH8_bYb6q0Bmq_tTo3clzljE6U",
    authDomain: "vue3-firebase-pinia-vite.firebaseapp.com",
    projectId: "vue3-firebase-pinia-vite",
    storageBucket: "vue3-firebase-pinia-vite.appspot.com",
    messagingSenderId: "238366754989",
    appId: "1:238366754989:web:221fcc66f58c4eb5a51e24"
};

initializeApp(firebaseConfig);

const auth = getAuth()

export {
    auth
};