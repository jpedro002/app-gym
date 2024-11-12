import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface FinishWorkoutButtonProps {
	handleFinish: () => void
}

export const FinishWorkoutButton = ({
	handleFinish,
}: FinishWorkoutButtonProps) => {
	return (
		<View className="mt-4 items-center">
			<TouchableOpacity
				onPress={handleFinish}
				className="bg-red-500 px-4 py-2 rounded-lg"
			>
				<Text className="text-white font-bold">Finalizar</Text>
			</TouchableOpacity>
		</View>
	)
}
