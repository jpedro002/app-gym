import { db } from '@/config/firebaseConfig'
import {
	setError,
	setLoading,
	setWorkoutList,
} from '@/store/slices/workoutSlice'
import { useAppSelector } from '@/store/store'
import { onValue, ref } from 'firebase/database'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export function useFetchWorkouts() {
	const dispatch = useDispatch()
	const userId = useAppSelector((state) => state.user.uid)
	const workouts = useAppSelector((state) => state.workout.workoutList)
	const loading = useAppSelector((state) => state.workout.loading)
	const error = useAppSelector((state) => state.workout.error)

	useEffect(() => {
		dispatch(setLoading(true))
		const workoutsRef = ref(db, `workouts/${userId}`)

		const getWorkouts = onValue(
			workoutsRef,
			(snapshot) => {
				const data = snapshot.val()
				if (data) {
					const workoutsList = Object.keys(data).map((key) => ({
						id: key,
						workoutName: data[key].workoutName,
						thumbUrl: data[key].thumbUrl,
					}))

					console.log(JSON.stringify(workoutsList, null, 2))

					dispatch(setWorkoutList(workoutsList))
				} else {
					dispatch(setWorkoutList([]))
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
	}, [dispatch, userId])

	return { workouts, loading, error }
}
