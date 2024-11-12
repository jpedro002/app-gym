import type { WorkoutList } from '@/store/slices/workoutSlice'
import { Link } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'

type CardWorkoutProps = WorkoutList

export const CardWorkout = ({
	thumbUrl,
	workoutName,
	id,
}: CardWorkoutProps) => {
	return (
		<View className="flex-row p-2 bg-white rounded-md mb-4  gap-4">
			<Image source={{ uri: thumbUrl }} className="w-32 h-32 rounded-md" />
			<View className="flex-1 justify-between">
				<Text className="text-lg font-semibold">{workoutName}</Text>
				<Link href={`/tabs/createWorkout/${id}`} asChild>
					<TouchableOpacity className="bg-red-500 py-2 px-6 items-center rounded-md">
						<Text className="text-white text-base font-roboto-bold">
							Começar
						</Text>
					</TouchableOpacity>
				</Link>
			</View>
		</View>
	)
}
