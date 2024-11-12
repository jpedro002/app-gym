import { auth } from '@/config/firebaseConfig'
import { setUserID } from '@/store/slices/userSlice'
import { Link, useRouter } from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import {
	Alert,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import { useDispatch } from 'react-redux'

export default function LoginScreen() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const router = useRouter()
	const dispatch = useDispatch()

	// Função para login de usuário
	const handleLogin = async () => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			)
			const userId = userCredential.user.uid // Pegando o ID do usuário para passar como parâmetro

			dispatch(setUserID(userId))
			router.replace('/tabs/home') // Navega para a tela principal do app com o ID do usuário
		} catch (error) {
			console.error('Erro ao fazer login:', error)
			Alert.alert(
				'Erro',
				'Não foi possível realizar o login. Verifique suas credenciais.',
			)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Bem-vindo!</Text>

			<TextInput
				style={styles.input}
				placeholder="Email"
				keyboardType="email-address"
				value={email}
				onChangeText={setEmail}
				placeholderTextColor="#888"
			/>

			<TextInput
				style={styles.input}
				placeholder="Senha"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
				placeholderTextColor="#888"
			/>

			<Pressable onPress={handleLogin} style={styles.loginButton}>
				<Text style={styles.loginButtonText}>Entrar</Text>
			</Pressable>

			<Link href={'/(app)/signup'} asChild>
				<Pressable style={styles.registerButton}>
					<Text style={styles.registerButtonText}>Criar Conta</Text>
				</Pressable>
			</Link>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
		backgroundColor: '#f0f0f0',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'red',
		textAlign: 'center',
		marginBottom: 30,
	},
	input: {
		backgroundColor: '#fff',
		padding: 15,
		borderRadius: 10,
		marginBottom: 15,
		fontSize: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	loginButton: {
		backgroundColor: 'red',
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: 'center',
		marginBottom: 20,
	},
	loginButtonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
	},
	registerButton: {
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: 'center',
		backgroundColor: '#d3d3d3',
	},
	registerButtonText: {
		color: 'gray',
		fontWeight: 'bold',
		fontSize: 16,
	},
})
