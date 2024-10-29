import { db } from '@/config/firebaseConfig' // Importa o Firebase
import { useAppSelector } from '@/store/store'
import { FontAwesome } from '@expo/vector-icons'
import { get, ref } from 'firebase/database' // Importa as funções necessárias do Realtime Database
import React, { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	Image,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import ProgressBar from 'react-native-progress/Bar'

export default function HomeScreen() {
	const userId = useAppSelector((state) => state.user.uid)
	const [userInfo, setUserInfo] = useState(null)
	const [loading, setLoading] = useState(true)
	const [modalVisible, setModalVisible] = useState(false)

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const userRef = ref(db, `users/${userId}`) // Referência ao nó do usuário no Realtime Database
				const snapshot = await get(userRef)

				if (snapshot.exists()) {
					setUserInfo(snapshot.val()) // Usa .val() para obter os dados
				} else {
					console.log('No such document!')
				}
			} catch (error) {
				console.error('Erro ao buscar dados do usuário:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchUserData()
	}, [userId])

	if (loading) {
		return <ActivityIndicator size="large" color="red" style={{ flex: 1 }} />
	}

	// Usa firstName ao invés de name
	const firstName = userInfo?.firstName || 'Usuário'

	return (
		<ScrollView style={styles.container}>
			{/* Título do App */}
			<View style={styles.appTitleContainer}>
				<Text style={styles.appTitle}>MyFitnessApp</Text>
			</View>

			{/* Foto de Perfil e Saudação */}
			<View style={styles.profileContainer}>
				<Image
					source={{
						uri: userInfo?.profilePicture || 'https://via.placeholder.com/100',
					}}
					style={styles.profilePicture}
				/>
				<Text style={styles.greeting}>Olá, {firstName}!</Text>

				{/* Botão de Notificações */}
				<TouchableOpacity onPress={() => setModalVisible(true)}>
					<FontAwesome
						name="bell"
						size={24}
						color="black"
						style={styles.notificationIcon}
					/>
				</TouchableOpacity>

				{/* Modal de Notificações */}
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => setModalVisible(false)}
				>
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<Text style={styles.modalTitle}>Notificações</Text>
							<Text style={styles.notificationText}>
								Nenhuma nova notificação
							</Text>
							<TouchableOpacity
								onPress={() => setModalVisible(false)}
								style={styles.closeModalButton}
							>
								<Text style={styles.closeModalButtonText}>Fechar</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</View>

			{/* Progresso do Usuário */}
			<View style={styles.card}>
				<Text style={styles.sectionTitle}>Progresso Semanal</Text>
				<ProgressBar progress={0.7} color="red" borderRadius={10} />
				<Text style={styles.progressText}>70% concluído esta semana</Text>
			</View>

			{/* Treino do Dia */}
			<View style={styles.card}>
				<Text style={styles.sectionTitle}>Treino de Hoje</Text>
				<Text style={styles.workoutDetail}>
					Exercícios: {userInfo?.todayWorkout || 'Nenhum treino programado.'}
				</Text>
			</View>

			{/* Próximos Treinos (Calendário) */}
			<View style={styles.card}>
				<Text style={styles.sectionTitle}>Próximos Treinos</Text>
				<Text style={styles.workoutDetail}>
					Treino 1: {userInfo?.upcomingWorkouts?.[0] || 'N/A'}
				</Text>
				<Text style={styles.workoutDetail}>
					Treino 2: {userInfo?.upcomingWorkouts?.[1] || 'N/A'}
				</Text>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f0f0',
	},
	appTitleContainer: {
		backgroundColor: 'red',
		paddingVertical: 20,
		alignItems: 'center',
	},
	appTitle: {
		fontSize: 24,
		color: 'white',
		fontWeight: 'bold',
	},
	profileContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20,
		justifyContent: 'space-between',
	},
	profilePicture: {
		width: 60,
		height: 60,
		borderRadius: 30,
	},
	greeting: {
		fontSize: 18,
		color: 'gray',
		marginLeft: 15,
		flex: 1,
	},
	notificationIcon: {
		marginLeft: 'auto',
	},
	card: {
		padding: 20,
		backgroundColor: '#fff',
		borderRadius: 10,
		marginHorizontal: 20,
		marginBottom: 20,
		elevation: 3,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#ff0000',
		marginBottom: 10,
	},
	progressText: {
		marginTop: 5,
		fontSize: 16,
		color: 'gray',
	},
	workoutDetail: {
		fontSize: 16,
		color: 'gray',
		marginBottom: 5,
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
	notificationText: {
		fontSize: 16,
		marginBottom: 20,
	},
	closeModalButton: {
		backgroundColor: 'red',
		borderRadius: 5,
		padding: 10,
		alignItems: 'center',
		width: '100%',
	},
	closeModalButtonText: {
		color: 'white',
		fontWeight: 'bold',
	},
})
