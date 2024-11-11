import { clearUser } from '@/store/slices/userSlice'
import { useRouter } from 'expo-router'
import React, { useState, forwardRef } from 'react'
import {
	Image,
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { useDispatch } from 'react-redux'

// Aqui não seria necessário, mas caso você queira utilizar ref para o Button, exemplo abaixo:
const Button = forwardRef(({ onPress, children, style }, ref) => (
	<TouchableOpacity ref={ref} style={style} onPress={onPress}>
		<Text style={styles.buttonText}>{children}</Text>
	</TouchableOpacity>
))

const ProfileScreen = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const [modalVisible, setModalVisible] = useState(false)
	const [modalType, setModalType] = useState(null)
	const [inputValue, setInputValue] = useState('')

	const openModal = (type) => {
		setModalType(type)
		setInputValue(type === 'peso' ? 'Peso atual' : 'Altura atual') // substituir pelos valores reais
		setModalVisible(true)
	}

	const handleSave = () => {
		// Lógica para salvar o novo peso ou altura no banco de dados
		setModalVisible(false)
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Meu Perfil</Text>
				<View style={styles.profilePictureContainer}>
					<Image
						source={{ uri: 'https://via.placeholder.com/100' }} // substituir pela URL real da foto de perfil
						style={styles.profilePicture}
					/>
				</View>
			</View>

			<View style={styles.buttonsContainer}>
				<Button
					style={styles.button}
					onPress={() => router.push('/(app)/editProfile')} // Redireciona para a página de edição do perfil
				>
					Editar Cadastro
				</Button>

				<Button style={styles.button} onPress={() => openModal('peso')}>
					Editar Peso
				</Button>

				<Button style={styles.button} onPress={() => openModal('altura')}>
					Editar Altura
				</Button>
			</View>

			<TouchableOpacity
				onPress={() => {
					dispatch(clearUser())
					router.replace('/(app)/')
				}}
				style={styles.logoutButton}
			>
				<Text style={styles.logoutText}>Logout</Text>
			</TouchableOpacity>

			<Modal
				transparent={true}
				animationType="slide"
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>
							{modalType === 'peso' ? 'Editar Peso' : 'Editar Altura'}
						</Text>
						<TextInput
							style={styles.modalInput}
							value={inputValue}
							onChangeText={(text) => setInputValue(text)}
							keyboardType="numeric"
						/>
						<TouchableOpacity style={styles.saveButton} onPress={handleSave}>
							<Text style={styles.saveButtonText}>Salvar</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => setModalVisible(false)}
							style={styles.closeButton}
						>
							<Text style={styles.closeButtonText}>Cancelar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	header: {
		backgroundColor: 'red',
		alignItems: 'center',
		paddingBottom: 50,
		paddingTop: 40,
	},
	headerText: {
		color: 'white',
		fontSize: 24,
		fontWeight: 'bold',
	},
	profilePictureContainer: {
		position: 'absolute',
		bottom: -50,
		width: 100,
		height: 100,
		borderRadius: 50,
		overflow: 'hidden',
		borderWidth: 3,
		borderColor: 'white',
	},
	profilePicture: {
		width: '100%',
		height: '100%',
	},
	buttonsContainer: {
		marginTop: 70,
		paddingHorizontal: 20,
	},
	button: {
		backgroundColor: 'white',
		padding: 15,
		borderRadius: 10,
		marginVertical: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 3,
		alignItems: 'center',
	},
	buttonText: {
		color: 'red',
		fontSize: 18,
		fontWeight: 'bold',
	},
	logoutButton: {
		marginTop: 'auto',
		padding: 20,
		alignItems: 'center',
	},
	logoutText: {
		color: 'red',
		fontSize: 18,
		fontWeight: 'bold',
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		width: 300,
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 20,
		alignItems: 'center',
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	modalInput: {
		width: '100%',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 10,
		padding: 10,
		marginVertical: 10,
		fontSize: 18,
	},
	saveButton: {
		backgroundColor: 'red',
		padding: 10,
		borderRadius: 5,
		width: '100%',
		alignItems: 'center',
	},
	saveButtonText: {
		color: 'white',
		fontSize: 18,
	},
	closeButton: {
		marginTop: 10,
	},
	closeButtonText: {
		color: 'red',
		fontSize: 16,
	},
})

export default ProfileScreen
