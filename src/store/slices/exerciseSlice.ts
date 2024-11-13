import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface Exercise {
	id: string
	name: string
	videoReference: string
	category?: string
}

interface ExerciseState {
	exercises: Exercise[]
	loading: boolean
	error: string | null
	categories: string[]
}

const initialState: ExerciseState = {
	exercises: [],
	loading: false,
	error: null,
	categories: [],
}

const exerciseSlice = createSlice({
	name: 'exercise',
	initialState,
	reducers: {
		setExercises(state, action: PayloadAction<Exercise[]>) {
			state.exercises = action.payload
			state.loading = false
			state.error = null
		},
		addExercise(state, action: PayloadAction<Exercise>) {
			state.exercises.push(action.payload)
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload
			state.loading = false
		},
		clearExercises(state) {
			state.exercises = []
			state.error = null
		},
		setCategories(state, action: PayloadAction<string[]>) {
			state.categories = action.payload
		},
	},
})

export const {
	setExercises,
	addExercise,
	setLoading,
	setError,
	clearExercises,
	setCategories,
} = exerciseSlice.actions

export default exerciseSlice.reducer
