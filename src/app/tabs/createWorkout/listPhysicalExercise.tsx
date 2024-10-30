// ListPhysicalExercise.tsx
import { ExerciseItem } from '@/components/createWorkout/ExeciseItem'
import { db } from '@/config/firebaseConfig'
import {
	setError,
	setExercises,
	setLoading,
} from '@/store/slices/exerciseSlice'
import { useAppSelector } from '@/store/store'
import { useRouter } from 'expo-router'
import { onValue, ref } from 'firebase/database'
import React, { useEffect } from 'react'
import {
	Alert,
	FlatList,
	Linking,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { useDispatch } from 'react-redux'

export default function ListPhysicalExercise() {
	const dispatch = useDispatch()
	const userId = useAppSelector((state) => state.user.uid)
	const exercises = useAppSelector((state) => state.exercise.exercises)
	const loading = useAppSelector((state) => state.exercise.loading)
	const error = useAppSelector((state) => state.exercise.error)
	const router = useRouter()

	const handleVideoPress = (url: string) => {
		Linking.openURL(url).catch(() =>
			Alert.alert('Erro', 'Não foi possível abrir o vídeo.'),
		)
	}

	useEffect(() => {
		dispatch(setLoading(true))
		const exercisesRef = ref(db, `exercises/${userId}`)
		const getExercises = onValue(
			exercisesRef,
			(snapshot) => {
				const data = snapshot.val()
				if (data) {
					const exercisesList = Object.keys(data).map((key) => ({
						id: key,
						...data[key],
					}))
					dispatch(setExercises(exercisesList))
				} else {
					dispatch(setExercises([]))
				}
			},
			(error) => {
				dispatch(setError('Erro ao carregar exercícios'))
				console.error('Erro ao carregar exercícios:', error)
			},
		)
		return () => {
			dispatch(setLoading(false))
			getExercises()
		}
	}, [dispatch, userId])

	return (
		<View className="flex-1 bg-gray-100 p-5">
			{loading ? (
				<Text className="text-gray-500 text-center">Carregando...</Text>
			) : error ? (
				<Text className="text-red-500 text-center">{error}</Text>
			) : exercises.length === 0 ? (
				<Text className="text-gray-500 text-center">
					Nenhum exercício cadastrado.
				</Text>
			) : (
				<FlatList
					data={exercises}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<ExerciseItem
							name={item.name}
							onPress={() => handleVideoPress(item.videoReference)} // Função anônima
						/>
					)}
					contentContainerStyle={{ paddingBottom: 20 }}
				/>
			)}
			<TouchableOpacity
				className="bg-red-500 rounded-lg p-4 absolute bottom-5 left-5 right-5"
				onPress={() =>
					router.push('/tabs/createWorkout/createPhysicalExercise')
				}
			>
				<Text className="text-white text-center text-xl">
					Adicionar Novo Exercício
				</Text>
			</TouchableOpacity>
		</View>
	)
}
