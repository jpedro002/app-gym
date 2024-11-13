import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ref, onValue, get, child } from 'firebase/database'
import { db } from '@/config/firebaseConfig'
import { useAppSelector } from '@/store/store'
import {
	setError,
	setExercises,
	setLoading,
	setCategories,
} from '@/store/slices/exerciseSlice'

export function useFetchExercises() {
	const dispatch = useDispatch()
	const userId = useAppSelector((state) => state.user.uid)
	const exercises = useAppSelector((state) => state.exercise.exercises)
	const loading = useAppSelector((state) => state.exercise.loading)
	const error = useAppSelector((state) => state.exercise.error)
	const categories = useAppSelector((state) => state.exercise.categories)

	useEffect(() => {
		const fetchCategories = async () => {
			dispatch(setLoading(true))
			try {
				const dbRef = ref(db)
				const snapshot = await get(child(dbRef, 'exercises/public'))
				if (snapshot.exists()) {
					const categories = Object.keys(snapshot.val())
					console.log('categories:', categories)

					dispatch(setCategories(categories))
				} else {
					dispatch(setCategories([]))
				}
			} catch (error) {
				console.error('Erro ao buscar categorias:', error)
				dispatch(setError('Erro ao buscar categorias'))
			} finally {
				dispatch(setLoading(false))
			}
		}

		fetchCategories()
	}, [dispatch])

	const fetchExercises = (param: string) => {
		dispatch(setLoading(true))
		const exercisesRef =
			param === 'criados'
				? ref(db, `exercises/${userId}`)
				: ref(db, `exercises/public/${param}`)

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
				console.error('Erro ao carregar exercícios:', error)
				dispatch(setError('Erro ao carregar exercícios'))
			},
		)

		return () => {
			dispatch(setLoading(false))
			if (exercises.length === 0) {
				getExercises()
			}
		}
	}

	// useEffect(() => {
	// 	dispatch(setLoading(true))
	// 	const exercisesRef = ref(db, `exercises/${userId}`)
	// 	const getExercises = onValue(
	// 		exercisesRef,
	// 		(snapshot) => {
	// 			const data = snapshot.val()
	// 			if (data) {
	// 				const exercisesList = Object.keys(data).map((key) => ({
	// 					id: key,
	// 					...data[key],
	// 				}))
	// 				dispatch(setExercises(exercisesList))
	// 			} else {
	// 				dispatch(setExercises([]))
	// 			}
	// 		},
	// 		(error) => {
	// 			console.error('Erro ao carregar exercícios:', error)
	// 			dispatch(setError('Erro ao carregar exercícios'))
	// 		},
	// 	)

	// 	return () => {
	// 		dispatch(setLoading(false))
	// 		if (exercises.length === 0) {
	// 			getExercises()
	// 		}
	// 	}
	// }, [dispatch, userId, exercises.length])

	return { exercises, loading, error, categories, fetchExercises }
}
