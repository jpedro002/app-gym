import { db } from '@/config/firebaseConfig'

import { useAppSelector } from '@/store/store'
import { onValue, ref } from 'firebase/database'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import {
	setCurrentWorkout,
	setError,
	setLoading,
} from '@/store/slices/workoutSlice'

export function useFetchCurrentWorkout({ workoutID }: { workoutID: string }) {
	const dispatch = useDispatch()
	const userId = useAppSelector((state) => state.user.uid)
	const currentWorkout = useAppSelector((state) => state.workout.workout)
	const loading = useAppSelector((state) => state.workout.loading)
	const error = useAppSelector((state) => state.workout.error)

	useEffect(() => {
		dispatch(setLoading(true))
		const workoutsRef = ref(db, `workouts/${userId}/${workoutID}`)
		const getWorkouts = onValue(
			workoutsRef,
			(snapshot) => {
				const data = snapshot.val()
				if (data) {
					dispatch(
						setCurrentWorkout({
							...data,
							currentIndex: 0,
						}),
					)
				} else {
					dispatch(setCurrentWorkout(null))
				}
			},
			(error) => {
				dispatch(setError('Erro ao carregar treinos'))
				console.error('Erro ao carregar treinos:', error)
			},
		)
		return () => {
			dispatch(setLoading(false))
			getWorkouts()
		}
	}, [dispatch, userId, workoutID])

	return { currentWorkout, loading, error }
}
