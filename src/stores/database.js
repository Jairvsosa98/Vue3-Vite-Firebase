import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore/lite'
import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'
import { db } from '../firebaseConfig'
import { auth } from '../firebaseConfig'
import router from '../router'
export const useDatabaseStore = defineStore('database', {
    state: () => ({
        documents: [],
        loadingDoc: false,
        loading: false
    }),
    actions: {
        async getUrl(id){
            try {
                const docRef = doc(db, 'urls', id)
                const docSnap = await getDoc(docRef)

                if (!docSnap.exists()) {
                    return false
                }

                return docSnap.data().name

            } catch (error) {
                console.log(error.message)
                return false
            } finally {

            }
        },
        async getUrls() {
            if (this.documents.length !== 0) {
                return
            }
            this.loadingDoc = true
            try {
                const q = query(collection(db, 'urls'), where('user', '==', auth.currentUser.uid))
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach(doc => {
                    this.documents.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
            } catch (error) {
                console.log(error)
            } finally {
                this.loadingDoc = false
            }
        },
        async addUrl(name) {
            this.loading = true
            try {
                const objDoc = {
                    name,
                    short: nanoid(6),
                    user: auth.currentUser.uid
                }
                await setDoc(doc(db, 'urls', objDoc.short), objDoc)

                this.documents.push({
                    ...objDoc,
                    id: objDoc.short
                })
            } catch (error) {
                console.log(error.code)
                return error.code
            } finally {
                this.loading = false
            }
        },
        async leerUrl(id) {
            try {
                const docRef = doc(db, 'urls', id)
                const docSnap = await getDoc(docRef)

                if (!docSnap.exists()) {
                    throw new Error("No existe el doc")
                }

                if (docSnap.data().user !== auth.currentUser.uid) {
                    throw new Error("Ese documento no le pertenece")
                }

                return docSnap.data().name

            } catch (error) {
                console.log(error.message)
            } finally {

            }
        },
        async updateUrl(id, name) {
            this.loading = true
            try {
                const docRef = doc(db, 'urls', id)
                const docSnap = await getDoc(docRef)

                if (!docSnap.exists()) {
                    throw new Error("No existe el doc")
                }

                if (docSnap.data().user === auth.currentUser.uid) {
                    await updateDoc(docRef, {
                        name: name,
                    })

                    this.documents = this.documents.map((item) => item.id === id ? { ...item, name: name } : item)
                    router.push('/')
                } else {
                    throw new Error("Ese documento no le pertenece")
                }

            } catch (error) {
                console.log(error.message)
                return error.message
            }finally {
                this.loading = false
            }
        },
        async deleteUrl(id) {
            this.loading = true
            try {
                const docRef = doc(db, 'urls', id)
                const docSnap = await getDoc(docRef)
                if (!docSnap.exists()) {
                    throw new Error("No existe el doc")
                }

                if (docSnap.data().user !== auth.currentUser.uid) {
                    throw new Error("Ese documento no le pertenece")
                }

                await deleteDoc(docRef)
                this.documents = this.documents.filter((item) => item.id !== id)
            } catch (error) {
                // console.log(error.code)
                return error.message
            } finally {
                this.loading = false
            }
        }
    }
}) 