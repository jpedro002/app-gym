import { auth } from '@/config/firebaseConfig'
import { setUserID } from '@/store/slices/userSlice'
import { Link, useRouter } from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
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
			<Text style={styles.title}>Login</Text>

			<TextInput
				style={styles.input}
				placeholder="Email"
				keyboardType="email-address"
				value={email}
				onChangeText={setEmail}
			/>

			<TextInput
				style={styles.input}
				placeholder="Senha"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>

			<Button title="Entrar" onPress={handleLogin} color="red" />

			<Link href={'/(app)/signup'} asChild>
				<Button
					title="Criar Conta"
					// onPress={() => navigation.navigate('SignUpScreen')} // Corrigido para "Register"
					color="gray"
				/>
			</Link>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#f0f0f0',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'red',
		textAlign: 'center',
		marginBottom: 20,
	},
	input: {
		backgroundColor: '#fff',
		padding: 10,
		borderRadius: 8,
		marginBottom: 10,
		fontSize: 16,
	},
})
