import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface UserState {
	email: string
	firstName: string
	lastName: string
	uid: string | number
	userType: 'user' | 'nutritionist'
	loading: boolean
}

const initialState: UserState = {
	email: '',
	firstName: '',
	lastName: '',
	uid: '',
	userType: 'user',
	loading: false,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserState>) => {
			const { email, firstName, lastName, uid, userType } = action.payload

			state.email = email
			state.firstName = firstName
			state.lastName = lastName
			state.uid = uid
			state.userType = userType
		},
		setUserID: (state, action: PayloadAction<string | number>) => {
			state.uid = action.payload
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload
		},
		clearUser: (state) => {
			state.email = ''
			state.firstName = ''
			state.lastName = ''
			state.uid = ''
			state.userType = 'user'
			state.loading = false
		},
	},
})

export const { setUser, setLoading, clearUser, setUserID } = userSlice.actions

export default userSlice.reducer
