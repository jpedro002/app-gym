import { useAppSelector } from '@/store/store'
import { Stack, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'

export default function Layout() {
	const user = useAppSelector((s) => s.user.uid)
	const router = useRouter()
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		// Define o estado de montagem como verdadeiro
		setIsMounted(true)
	}, [])

	useEffect(() => {
		if (isMounted) {
			if (user) {
				router.replace('/tabs/home')
			} else {
				router.replace('/(app)/')
			}
		}
	}, [isMounted, router, user])

	if (!isMounted) {
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		)
	}

	return (
		<Stack initialRouteName="index">
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="signup" options={{ headerShown: false }} />
		</Stack>
	)
}
