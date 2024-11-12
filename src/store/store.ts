import { configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useSelector } from 'react-redux'
import counterSlice from './slices/counterSlice'
import exercise from './slices/exerciseSlice'
import user from './slices/userSlice'
import workout from './slices/workoutSlice'

export const store = configureStore({
	reducer: {
		counter: counterSlice,
		user,
		exercise,
		workout,
	},
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppDispatch = typeof store.dispatch
