import { Stack, useRouter } from 'expo-router'

export default function Layout() {
	return (
		<Stack initialRouteName="login">
			{/* Tela de Login */}
			<Stack.Screen name="index" options={{ headerShown: false }} />
			{/* Tela de Cadastro */}
			<Stack.Screen
				name="createPhysicalExercise"
				options={{
					title: 'Adicionar Exercício',
				}}
			/>
			<Stack.Screen
				name="listPhysicalExercise"
				options={{
					title: 'Lista de Exercícios',
				}}
			/>
			<Stack.Screen
				name="createWorkoutForm"
				options={{
					title: 'Criar Treino',
				}}
			/>
		</Stack>
	)
}
