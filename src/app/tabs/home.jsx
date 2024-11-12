import { db } from '@/config/firebaseConfig'
import { useFetchMarkedDates } from '@/hooks/useFetchMarkedDates'
import { useAppSelector } from '@/store/store'
import { FontAwesome } from '@expo/vector-icons'
import { get, ref } from 'firebase/database'
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
import { Calendar } from 'react-native-calendars'
import ProgressBar from 'react-native-progress/Bar'

export default function HomeScreen() {
	// Obtendo o userId do estado global via Redux (useAppSelector)
	const userId = useAppSelector((state) => state.user.uid)
	const [userInfo, setUserInfo] = useState(null)
	const [loading, setLoading] = useState(true)
	const [modalVisible, setModalVisible] = useState(false)
	const markedDates = useFetchMarkedDates()

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				// Consultando dados do usuário no Firebase com o userId
				const userRef = ref(db, `users/${userId}`)
				const snapshot = await get(userRef)

				if (snapshot.exists()) {
					setUserInfo(snapshot.val()) // Definindo as informações do usuário
				} else {
					console.log('No such document!')
				}
			} catch (error) {
				console.error('Erro ao buscar dados do usuário:', error)
			} finally {
				setLoading(false)
			}
		}

		// Carregando os dados do usuário quando o component for montado
		fetchUserData()
	}, [userId])

	if (loading) {
		// Exibindo indicador de carregamento enquanto os dados do usuário não são carregados
		return <ActivityIndicator size="large" color="red" style={{ flex: 1 }} />
	}

	const firstName = userInfo?.firstName || 'Usuário'
	const weight = userInfo?.weight || 0
	const height = userInfo?.height || 1

	// Cálculo do IMC
	const bmi = weight / (height / 100) ** 2
	const idealBmiMin = 18.5
	const idealBmiMax = 24.9

	const bmiCategory =
		bmi < idealBmiMin
			? 'Abaixo do IMC ideal'
			: bmi > idealBmiMax
				? 'Acima do IMC ideal'
				: 'Dentro do IMC ideal!'

	return (
		<ScrollView style={styles.container}>
			<View style={styles.appTitleContainer}>
				<Text style={styles.appTitle}>MyFitnessApp</Text>
			</View>

			<View style={styles.profileContainer}>
				<Image
					source={{
						uri: userInfo?.profilePicture || 'https://via.placeholder.com/100',
					}}
					style={styles.profilePicture}
				/>
				<Text style={styles.greeting}>Olá, {firstName}!</Text>

				{/* Botão de Notificação Atualizado */}
				<TouchableOpacity
					onPress={() => setModalVisible(true)}
					style={styles.notificationContainer}
				>
					<FontAwesome name="bell" size={24} color="white" />
				</TouchableOpacity>

				{/* Modal de Notificações com fundo translúcido */}
				<Modal
					animationType="fade"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => setModalVisible(false)}
				>
					<View style={styles.modalOverlay}>
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

			<View style={styles.card}>
				<Text style={styles.sectionTitle}>Progresso Semanal</Text>
				<ProgressBar progress={0.7} color="red" borderRadius={10} height={10} />
				<Text style={styles.progressText}>70% concluído esta semana</Text>
			</View>

			<View style={styles.card}>
				<Text style={styles.sectionTitle}>Treino de Hoje</Text>
				<Text style={styles.workoutDetail}>
					Exercícios: {userInfo?.todayWorkout || 'Nenhum treino programado.'}
				</Text>
			</View>

			<View style={styles.card}>
				<Text style={styles.sectionTitle}>IMC Atual</Text>
				<Text style={styles.bmiValue}>IMC: {bmi.toFixed(1)}</Text>
				<Text style={styles.bmiInfo}>{bmiCategory}</Text>

				<View style={styles.bmiProgressContainer}>
					<View style={styles.bmiBarBackground} />
					<View
						style={[
							styles.idealBmiRange,
							{
								left: `${(idealBmiMin / 40) * 100}%`,
								width: `${((idealBmiMax - idealBmiMin) / 40) * 100}%`,
							},
						]}
					/>
					<View style={[styles.bmiMarker, { left: `${(bmi / 40) * 100}%` }]} />
				</View>
			</View>

			<View style={styles.card}>
				<Text style={styles.sectionTitle}>Calendário de Treinos</Text>
				<Calendar
					markedDates={markedDates}
					theme={{
						arrowColor: 'red',
						todayTextColor: 'red',
						selectedDayBackgroundColor: 'red',
						selectedDayTextColor: 'white',
						monthTextColor: 'black',
					}}
				/>
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
	notificationContainer: {
		backgroundColor: '#ff6347', // fundo chamativo
		padding: 8,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 'auto',
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)', // fundo translúcido
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalContent: {
		width: '80%',
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		alignItems: 'center',
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	notificationText: {
		fontSize: 16,
		color: 'gray',
		marginBottom: 20,
		textAlign: 'center',
	},
	closeModalButton: {
		backgroundColor: '#ff6347',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	closeModalButtonText: {
		color: 'white',
		fontWeight: 'bold',
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
		fontSize: 16,
		color: 'gray',
		marginTop: 5,
	},
	bmiValue: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'red',
		marginBottom: 10,
	},
	bmiInfo: {
		fontSize: 16,
		color: 'gray',
	},
	bmiProgressContainer: {
		position: 'relative',
		height: 10,
		backgroundColor: '#e0e0e0',
		marginTop: 10,
	},
	bmiBarBackground: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 10,
		backgroundColor: '#e0e0e0',
	},
	idealBmiRange: {
		position: 'absolute',
		top: 0,
		height: 10,
		backgroundColor: '#90ee90',
	},
	bmiMarker: {
		position: 'absolute',
		top: 0,
		width: 10,
		height: 10,
		backgroundColor: 'red',
		borderRadius: 5,
	},
})
