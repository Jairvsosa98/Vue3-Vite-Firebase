import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBHBjfFjhH8_bYb6q0Bmq_tTo3clzljE6U",
    authDomain: "vue3-firebase-pinia-vite.firebaseapp.com",
    projectId: "vue3-firebase-pinia-vite",
    storageBucket: "vue3-firebase-pinia-vite.appspot.com",
    messagingSenderId: "238366754989",
    appId: "1:238366754989:web:221fcc66f58c4eb5a51e24"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth()
const db = getFirestore()
const storage = getStorage(firebaseApp)

export {
    auth,
    db,
    storage
};