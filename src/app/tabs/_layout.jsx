import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName = ''
					if (route.name === 'home') {
						iconName = focused ? 'home' : 'home-outline'
					} else if (route.name === 'createWorkout') {
						iconName = focused ? 'add-circle' : 'add-circle-outline'
					} else if (route.name === 'progress') {
						iconName = focused ? 'stats-chart' : 'stats-chart-outline'
					} else if (route.name === 'profile') {
						iconName = focused ? 'person' : 'person-outline'
					}

					return <Ionicons name={iconName} size={size} color={color} />
				},
				tabBarActiveTintColor: 'red',
				tabBarInactiveTintColor: 'gray',
				headerShown: false,
			})}
		>
			<Tabs.Screen name="home" />
			<Tabs.Screen name="createWorkout" />
			<Tabs.Screen name="progress" />
			<Tabs.Screen name="profile" />
		</Tabs>
	)
}
