import { db } from '@/config/firebaseConfig'
import {
	setError,
	setExercises,
	setLoading,
} from '@/store/slices/exerciseSlice'
import { useAppSelector } from '@/store/store'
import { onValue, ref } from 'firebase/database'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export function useFetchExercises() {
	const dispatch = useDispatch()
	const userId = useAppSelector((state) => state.user.uid)
	const exercises = useAppSelector((state) => state.exercise.exercises)
	const loading = useAppSelector((state) => state.exercise.loading)
	const error = useAppSelector((state) => state.exercise.error)

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
			if (exercises.length === 0) {
				getExercises()
			}
		}
	}, [dispatch, userId, exercises.length])

	return { exercises, loading, error }
}
