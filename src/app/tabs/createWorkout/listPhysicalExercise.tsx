import { ExerciseItem } from '@/components/createWorkout/ExeciseItem'
import { useFetchExercises } from '@/hooks/useFetchExercises'

import { useRouter } from 'expo-router'
import {
	Alert,
	FlatList,
	Linking,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'

export default function ListPhysicalExercise() {
	const { exercises, loading, error } = useFetchExercises()
	const router = useRouter()

	const handleVideoPress = (url: string) => {
		Linking.openURL(url).catch(() =>
			Alert.alert('Erro', 'Não foi possível abrir o vídeo.'),
		)
	}
	return (
		<View className="flex-1 bg-gray-100 p-5 gap-4">
			{loading ? (
				<Text className="text-gray-500 text-center">Carregando...</Text>
			) : error ? (
				<Text className="text-red-500 text-center">{error}</Text>
			) : exercises.length === 0 ? (
				<Text className="text-gray-500 text-center">
					Nenhum exercício cadastrado.
				</Text>
			) : (
				<FlatList
					data={exercises}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<ExerciseItem
							name={item.name}
							onPress={() => handleVideoPress(item.videoReference)}
						/>
					)}
					contentContainerStyle={{ paddingBottom: 20 }}
				/>
			)}
			<TouchableOpacity
				className="bg-red-500 rounded-lg p-4 "
				onPress={() =>
					router.push('/tabs/createWorkout/createPhysicalExercise')
				}
			>
				<Text className="text-white text-center text-xl">
					Adicionar Novo Exercício
				</Text>
			</TouchableOpacity>
		</View>
	)
}
