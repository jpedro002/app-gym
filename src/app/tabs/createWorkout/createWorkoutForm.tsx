import { ModalSelectExerciseToCreateWorkout } from '@/components/createWorkout/ModalSelectExerciseToCreateWorkout'
import { db } from '@/config/firebaseConfig'
import { useAppSelector } from '@/store/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { push, ref, set } from 'firebase/database'
import { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import {
	Alert,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { z } from 'zod'

const workoutSchema = z.object({
	workoutName: z.string().min(1, 'Nome do treino é obrigatório'),
	exercises: z
		.array(
			z.object({
				repetitions: z.string().min(1, 'Repetições são obrigatórias'),
				series: z.string().min(1, 'Séries são obrigatórias'),
				videoReference: z
					.string()
					.url('URL inválida')
					.min(1, 'URL é obrigatória'),
				name: z.string().min(1, 'Selecione um exercício'),
			}),
		)
		.refine((exercises) => exercises.length > 0, {
			message: 'Adicione pelo menos um exercício',
		}),
})

type WorkoutFormData = z.infer<typeof workoutSchema>

//TODO create slice to workout and hook to create workout

const CreateWorkoutForm = () => {
	const userId = useAppSelector((state) => state.user.uid)

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<WorkoutFormData>({
		resolver: zodResolver(workoutSchema),
		defaultValues: {
			workoutName: '',
			exercises: [
				{ repetitions: '', series: '', name: '', videoReference: '' },
			],
		},
	})

	const { fields, append, remove, update } = useFieldArray({
		control,
		name: 'exercises',
	})

	const [modalVisible, setModalVisible] = useState(false)
	const [currentIndex, setCurrentIndex] = useState<number | null>(null)

	const onSubmit = async (data: WorkoutFormData) => {
		try {
			const { workoutName, exercises } = data
			const workoutsRef = ref(db, `workouts/${userId}`)
			const newWorkoutRef = push(workoutsRef)

			await set(newWorkoutRef, {
				workoutName,
				exercises,
			})

			Alert.alert('Sucesso', 'Treino cadastrado com sucesso!')
			reset()
		} catch (error) {
			console.error('Erro ao cadastrar treino:', error)
			Alert.alert('Erro', 'Não foi possível realizar o cadastro')
		}
	}

	const handleAddExercise = () => {
		append({ repetitions: '', series: '', name: '', videoReference: '' })
	}

	const handleExerciseSelect = (name: string, videoReference: string) => {
		if (currentIndex !== null) {
			const { repetitions, series } =
				control._formValues.exercises[currentIndex] || {}
			update(currentIndex, {
				repetitions,
				series,
				name,
				videoReference,
			})
		}
		setModalVisible(false)
	}

	return (
		<View className="flex-1 p-5 pt-0 bg-gray-100">
			<ScrollView className="flex-1 pt-5">
				<View className="mb-4">
					<Controller
						control={control}
						name="workoutName"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								className="bg-white p-2 rounded-lg mb-2 text-base"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								placeholder="Nome do Treino"
								keyboardType="number-pad"
							/>
						)}
					/>
					{errors.workoutName && (
						<Text className="text-red-500">{errors.workoutName.message}</Text>
					)}

					{fields.map((item, index) => (
						<View
							key={item.id}
							className="mb-4 gap-2 mt-4 border-b border-black pb-2 "
						>
							<TouchableOpacity
								className="bg-slate-500 p-2 rounded-lg justify-center items-center"
								onPress={() => {
									setModalVisible(true)
									setCurrentIndex(index)
								}}
								activeOpacity={0.8}
							>
								<Text className="text-white">
									{item.name || 'Selecionar exercício aqui'}
								</Text>
							</TouchableOpacity>
							{errors.exercises?.[index]?.name && (
								<Text className="text-red-500">
									{errors.exercises[index].name.message}
								</Text>
							)}
							<View className="flex-row gap-2">
								<View className="flex-1">
									<Controller
										control={control}
										name={`exercises.${index}.repetitions`}
										render={({ field: { onChange, onBlur, value } }) => (
											<TextInput
												className="bg-white p-2 rounded-lg"
												onBlur={onBlur}
												onChangeText={onChange}
												value={value}
												placeholder="Repetições"
											/>
										)}
									/>
									{errors.exercises?.[index]?.repetitions && (
										<Text className="text-red-500">
											{errors.exercises[index].repetitions.message}
										</Text>
									)}
								</View>
								<View className="flex-1">
									<Controller
										control={control}
										name={`exercises.${index}.series`}
										render={({ field: { onChange, onBlur, value } }) => (
											<TextInput
												className="bg-white p-2 rounded-lg"
												onBlur={onBlur}
												onChangeText={onChange}
												value={value}
												placeholder="Séries"
											/>
										)}
									/>
									{errors.exercises?.[index]?.series && (
										<Text className="text-red-500">
											{errors.exercises[index].series.message}
										</Text>
									)}
								</View>
							</View>
							<TouchableOpacity
								className="bg-red-500 p-2 rounded-lg justify-center items-center"
								onPress={() => remove(index)}
							>
								<Text className="text-white">Excluir</Text>
							</TouchableOpacity>
						</View>
					))}
				</View>
				{errors.exercises?.root?.message && (
					<Text className="text-red-500">
						{errors.exercises?.root?.message}
					</Text>
				)}
			</ScrollView>

			<View className="flex-row justify-between gap-2">
				<TouchableOpacity
					className="bg-green-500 flex-1 rounded-lg p-2 mb-4"
					onPress={handleAddExercise}
				>
					<Text className="text-white text-center text-2xl">+</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className="bg-blue-500 flex-1 rounded-lg p-3 mb-4"
					onPress={handleSubmit(onSubmit)}
				>
					<Text className="text-white text-center">Cadastrar Treino</Text>
				</TouchableOpacity>
			</View>

			<ModalSelectExerciseToCreateWorkout
				handleExerciseSelect={handleExerciseSelect}
				modalVisible={modalVisible}
				setModalVisible={() => setModalVisible((s) => !s)}
			/>
		</View>
	)
}

export default CreateWorkoutForm
