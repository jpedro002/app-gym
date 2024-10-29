import AsyncStorage from '@react-native-async-storage/async-storage'
// Importa as funções necessárias do SDK
import { initializeApp } from 'firebase/app'
import { getReactNativePersistence, initializeAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database' // Importa o Realtime Database

// Configuração do Firebase
const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_API_KEY,
	authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
	storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.EXPO_PUBLIC_APP_ID,
	databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL,
}

// Inicializa o Firebase App
const app = initializeApp(firebaseConfig)

// Inicializa o Auth com AsyncStorage para persistência no React Native
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
})

// Inicializa o Realtime Database
const db = getDatabase(app)

export { auth, db } // Exporta o auth e o db
