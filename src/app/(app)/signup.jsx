import { auth, db } from '@/config/firebaseConfig'
import { setUserID } from '@/store/slices/userSlice'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useRouter } from 'expo-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, set } from 'firebase/database'
import React, { useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { useDispatch } from 'react-redux'

export default function SignUpScreen() {
	const [firstName, setFirstName] = useState('') // Campo para o primeiro nome
	const [lastName, setLastName] = useState('') // Campo para o sobrenome
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [weight, setWeight] = useState('')
	const [height, setHeight] = useState('')
	const [birthDate, setBirthDate] = useState(new Date())
	const [showDatePicker, setShowDatePicker] = useState(false)

	const router = useRouter()
	const dispatch = useDispatch()

	// Função para criar o usuário e salvar no Realtime Database
	const handleSignUp = async () => {
		try {
			// Cria o usuário com email e senha
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			)
			const userId = userCredential.user.uid

			// Referência ao caminho do usuário no banco de dados
			const userRef = ref(db, `users/${userId}`)

			// Salva os dados adicionais no Realtime Database
			await set(userRef, {
				firstName, // Salva o primeiro nome
				lastName, // Salva o sobrenome
				email,
				weight,
				height,
				birthDate: birthDate.toISOString().split('T')[0], // Formata a data como AAAA-MM-DD
			})

			dispatch(setUserID(userId))
			router.navigate('/tabs/home') // Navega para a tela principal do app com o ID do usuário
		} catch (error) {
			console.error('Erro ao cadastrar usuário:', error)
			Alert.alert('Erro', 'Não foi possível realizar o cadastro')
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Criar Conta</Text>

			<TextInput
				style={styles.input}
				placeholder="Nome"
				value={firstName}
				onChangeText={setFirstName}
			/>
			<TextInput
				style={styles.input}
				placeholder="Sobrenome"
				value={lastName}
				onChangeText={setLastName}
			/>
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
			<TextInput
				style={styles.input}
				placeholder="Peso (kg)"
				keyboardType="numeric"
				value={weight}
				onChangeText={setWeight}
			/>
			<TextInput
				style={styles.input}
				placeholder="Altura (cm)"
				keyboardType="numeric"
				value={height}
				onChangeText={setHeight}
			/>

			{/* Data de Nascimento */}
			<Text style={styles.label}>Data de Nascimento</Text>
			<Button title="Selecionar Data" onPress={() => setShowDatePicker(true)} />
			{showDatePicker && (
				<DateTimePicker
					value={birthDate}
					mode="date"
					display="default"
					onChange={(_event, selectedDate) => {
						const currentDate = selectedDate || birthDate
						setShowDatePicker(false)
						setBirthDate(currentDate)
					}}
				/>
			)}

			<Button title="Cadastrar" onPress={handleSignUp} color="red" />
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
	label: {
		fontSize: 16,
		color: 'gray',
		marginVertical: 10,
	},
})
