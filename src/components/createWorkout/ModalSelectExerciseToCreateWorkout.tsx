import { useFetchExercises } from '@/hooks/useFetchExercises'
import React, { useEffect, useState } from 'react'
import {
	Button,
	FlatList,
	Modal,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'

interface ModalSelectExerciseToCreateWorkoutProps {
	modalVisible: boolean
	setModalVisible: () => void
	handleExerciseSelect: (name: string, videoReference: string) => void
}

export const ModalSelectExerciseToCreateWorkout = ({
	modalVisible,
	handleExerciseSelect,
	setModalVisible,
}: ModalSelectExerciseToCreateWorkoutProps) => {
	const { exercises, loading, error, fetchExercises, categories } =
		useFetchExercises()
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('criados')

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchExercises(selectedCategory)
	}, [selectedCategory])

	const filteredExercises = exercises.filter((exercise) =>
		exercise.name.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	useEffect(() => {
		if (modalVisible) return setSearchQuery('')
	}, [modalVisible])

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => setModalVisible()}
		>
			<View className="flex-1 bg-[#00000073] p-4">
				<View className="bg-white p-5 rounded-lg flex-1">
					<Text className="text-lg font-bold mb-4">Selecione um Exercício</Text>

					<TextInput
						className="border border-gray-300 rounded-md p-2 mb-4"
						placeholder="Pesquisar exercício..."
						value={searchQuery}
						onChangeText={setSearchQuery}
					/>

					{/* ScrollView para categorias */}
					{loading ? (
						<Text className="text-center text-gray-500">Carregando...</Text>
					) : (
						<ScrollView horizontal className="h-28">
							<View className="flex-row gap-4">
								{categories && categories.length > 0 ? (
									categories.map((category, index) => (
										<TouchableOpacity
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={index}
											className={`p-2 border h-16 items-center justify-center border-gray-300 rounded-md ${selectedCategory === category ? 'bg-gray-200' : ''}`}
											onPress={() => setSelectedCategory(category)}
										>
											<Text>{category}</Text>
										</TouchableOpacity>
									))
								) : (
									<Text className="text-center text-gray-500">
										Nenhuma categoria encontrada.
									</Text>
								)}
								{/* Opção para "Criados" */}
								<TouchableOpacity
									className={`p-2 border h-16 items-center justify-center border-gray-300 rounded-md ${selectedCategory === 'criados' ? 'bg-gray-200' : ''}`}
									onPress={() => setSelectedCategory('criados')}
								>
									<Text>Criados</Text>
								</TouchableOpacity>
							</View>
						</ScrollView>
					)}

					{loading ? (
						<Text className="text-center text-gray-500">Carregando...</Text>
					) : error ? (
						<Text className="text-center text-red-500">{error}</Text>
					) : (
						<FlatList
							data={filteredExercises}
							keyExtractor={(item) => item.id}
							renderItem={({ item }) => (
								<TouchableOpacity
									onPress={() => {
										handleExerciseSelect(item.name, item.videoReference)
									}}
									className="p-2 border-b border-gray-300"
								>
									<Text>{item.name}</Text>
								</TouchableOpacity>
							)}
							ListEmptyComponent={
								<Text className="text-center text-gray-500">
									Nenhum exercício encontrado.
								</Text>
							}
						/>
					)}

					<Button title="Fechar" onPress={setModalVisible} />
				</View>
			</View>
		</Modal>
	)
}
