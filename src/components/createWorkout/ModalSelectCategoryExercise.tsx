import React, { useState } from 'react'
import {
	Button,
	FlatList,
	Modal,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'

interface SelectCategoryExerciseProps {
	modalVisible: boolean
	setModalVisible: () => void
	handleCategorySelect: (category: string) => void
}

export const ModalSelectCategoryExercise = ({
	modalVisible,
	handleCategorySelect,
	setModalVisible,
}: SelectCategoryExerciseProps) => {
	const [searchQuery, setSearchQuery] = useState('')
	const categories = [
		'Perna',
		'Peito',
		'Tríceps',
		'Bíceps',
		'Abs/Core',
		'Costas',
	]

	const filteredCategories = categories.filter((category) =>
		category.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => setModalVisible()}
		>
			<View className="flex-1 bg-[#00000073] p-4">
				<View className="bg-white p-5 rounded-lg flex-1">
					<Text className="text-lg font-bold mb-4">
						Selecione uma Categoria
					</Text>

					<TextInput
						className="border border-gray-300 rounded-md p-2 mb-4"
						placeholder="Pesquisar categoria..."
						value={searchQuery}
						onChangeText={setSearchQuery}
					/>

					<FlatList
						data={filteredCategories}
						keyExtractor={(item) => item}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => {
									handleCategorySelect(item)
								}}
								className="p-2 border-b border-gray-300"
							>
								<Text>{item}</Text>
							</TouchableOpacity>
						)}
						ListEmptyComponent={
							<Text className="text-center text-gray-500">
								Nenhuma categoria encontrada.
							</Text>
						}
					/>

					<Button title="Fechar" onPress={setModalVisible} />
				</View>
			</View>
		</Modal>
	)
}
