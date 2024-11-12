import { CardWorkout } from '@/components/CardWorkout'
import { useFetchWorkouts } from '@/hooks/useFetchWorkouts'
import React from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'

const ListWorkouts = () => {
	const { error, loading, workouts } = useFetchWorkouts()

	if (loading) {
		return (
			<View className="flex-1 justify-center items-center bg-[#f0f0f0]">
				<ActivityIndicator size="large" color="#000" />
				<Text>Carregando treinos...</Text>
			</View>
		)
	}

	if (error) {
		return (
			<View className="flex-1 justify-center items-center bg-[#f0f0f0]">
				<Text className="text-red-500">
					Erro ao carregar os treinos: {error}
				</Text>
			</View>
		)
	}

	return (
		<View className="flex-1 bg-[#f0f0f0]">
			<FlatList
				data={workouts}
				renderItem={({ item }) => (
					<CardWorkout
						thumbUrl={item.thumbUrl || 'https://via.placeholder.com/100'}
						workoutName={item.workoutName}
						id={item.id}
					/>
				)}
				keyExtractor={(item) => item.id}
				contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
			/>
		</View>
	)
}

export default ListWorkouts
