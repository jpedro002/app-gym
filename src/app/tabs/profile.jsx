import { clearUser } from '@/store/slices/userSlice'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'

const ProfileScreen = () => {
	const dispatch = useDispatch()
	const router = useRouter()

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => {
					dispatch(clearUser())
					router.replace('/(app)/')
				}}
				className="bg-slate-400 p-4 rounded-md"
			>
				<Text style={styles.text}>Perfil do Usuário</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5', // Cor de fundo leve
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
	},
})

export default ProfileScreen
