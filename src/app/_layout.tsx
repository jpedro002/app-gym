import { Slot } from 'expo-router'
import '../global.css'
import { ReduxProvider } from '@/store/ReduxProvider'
import {
	Roboto_400Regular,
	Roboto_700Bold,
	useFonts,
} from '@expo-google-fonts/roboto'
import { ActivityIndicator, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function LayoutMain() {
	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_700Bold,
	})

	if (!fontsLoaded) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" />
			</View>
		)
	}

	return (
		<ReduxProvider>
			<GestureHandlerRootView>
				<Slot />
			</GestureHandlerRootView>
		</ReduxProvider>
	)
}
