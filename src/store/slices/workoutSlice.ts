import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface Exercise {
	name: string
	repetitions: string
	series: string
	videoReference: string
	isDone?: boolean
}

interface Workout {
	workoutName: string
	exercises: Exercise[]
	currentIndex: number
}

export interface WorkoutList {
	id: string
	workoutName: string
	thumbUrl: string
}

interface WorkoutState {
	workout: Workout | null
	workoutList: WorkoutList[]
	loading: boolean
	error: string | null
}

const initialState: WorkoutState = {
	workoutList: [],
	workout: null,
	loading: false,
	error: null,
}

const workoutSlice = createSlice({
	name: 'workout',
	initialState,
	reducers: {
		setWorkoutList(state, action: PayloadAction<WorkoutList[]>) {
			state.workoutList = action.payload
			state.loading = false
			state.error = null
		},
		setCurrentWorkout(state, action: PayloadAction<Workout | null>) {
			state.workout = action.payload
			state.loading = false
			state.error = null
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload
			state.loading = false
		},
		setExerciseDoneState(
			state,
			action: PayloadAction<{
				index: number
				isDone: boolean
			}>,
		) {
			const { index, isDone } = action.payload

			if (state.workout?.exercises?.[index]) {
				state.workout.exercises[index].isDone = isDone
			}

			if (isDone && state.workout && state.workout.currentIndex !== undefined) {
				const nextIndex = state.workout.currentIndex + 1
				state.workout.currentIndex =
					nextIndex >= state.workout.exercises.length ? 0 : nextIndex
			}
		},

		setCurrentIndex(state, action: PayloadAction<number>) {
			if (state.workout) {
				state.workout.currentIndex = action.payload
			}
		},

		clearWorkouts(state) {
			state.workoutList = []
			state.loading = false
			state.workout = null
			state.error = null
		},
	},
})

export const {
	setWorkoutList,
	setCurrentWorkout,
	setLoading,
	setError,
	setExerciseDoneState,
	setCurrentIndex,
	clearWorkouts,
} = workoutSlice.actions

export default workoutSlice.reducer
