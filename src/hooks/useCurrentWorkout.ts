import { db } from '@/config/firebaseConfig'
import { useAppSelector } from '@/store/store'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { push, ref, set } from 'firebase/database'
import { useEffect } from 'react'
import { Alert } from 'react-native'
import { useFetchCurrentWorkout } from './useFetchCurrentWorkout'

export const useCurrentWorkout = () => {
	const { workoutID } = useLocalSearchParams()

	const router = useRouter()

	const { currentWorkout } = useFetchCurrentWorkout({
		workoutID: workoutID as string,
	})

	const userId = useAppSelector((state) => state.user.uid)

	const crrExerciseIndex = useAppSelector(
		(s) => s.workout.workout?.currentIndex,
	)

	const crrExercise = currentWorkout?.exercises[crrExerciseIndex || 0]

	const workoutName = useAppSelector((state) => {
		const workout = state.workout.workoutList.find(
			(workout) => workout.id === workoutID,
		)
		return workout?.workoutName
	})

	const handleFinishWorkout = async (ignoreAlert = false) => {
		try {
			const someExerciseIsNotCompleted = currentWorkout?.exercises.some(
				(exercise) => !exercise.isDone,
			)

			console.log(
				'someExerciseIsNotCompleted',
				someExerciseIsNotCompleted,
				ignoreAlert,
			)

			if (someExerciseIsNotCompleted) {
				return Alert.alert(
					'Ei!',
					'Existem exercícios não completados, termine-os antes de finalizar o treino',
				)
			}

			console.log('Finalizando treino')

			const exercisesRef = ref(db, `workoutsClompleted/${userId}`)
			const newExerciseRef = push(exercisesRef)

			await set(newExerciseRef, {
				workoutID,
				date: new Date().toISOString(),
			})

			router.replace('/tabs/home')
			Alert.alert('Sucesso', 'Treino finalizado com sucesso!')
		} catch (error) {
			console.error('Erro ao cadastrar exercício:', error)
			Alert.alert('Erro', 'Não foi possível finalizar o treino')
		}
	}

	const navigation = useNavigation()

	useEffect(() => {
		if (workoutID) {
			navigation.setOptions({
				title: workoutName || 'Treino',
			})
		}
	}, [workoutID, navigation, workoutName])

	return {
		currentWorkout,
		crrExercise,
		handleFinishWorkout,
	}
}
