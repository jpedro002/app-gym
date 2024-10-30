// ExerciseItem.tsx
import { Text, TouchableOpacity, View } from 'react-native'

interface ExerciseItemProps {
	name: string
	onPress: () => void // Função sem parâmetros
}

export const ExerciseItem = ({ name, onPress }: ExerciseItemProps) => {
	return (
		<View className="bg-white rounded-lg shadow p-4 mb-4">
			<Text className="text-lg font-semibold">{name}</Text>
			<TouchableOpacity onPress={onPress}>
				<Text className="text-blue-500 underline">Ver Vídeo de Referência</Text>
			</TouchableOpacity>
		</View>
	)
}
