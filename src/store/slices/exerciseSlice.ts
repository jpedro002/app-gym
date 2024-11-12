import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

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
}

const initialState: ExerciseState = {
	exercises: [],
	loading: false,
	error: null,
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
	},
})

export const {
	setExercises,
	addExercise,
	setLoading,
	setError,
	clearExercises,
} = exerciseSlice.actions

export default exerciseSlice.reducer
