import { ModalSelectCategoryExercise } from '@/components/createWorkout/ModalSelectCategoryExercise'
import { db } from '@/config/firebaseConfig'
import { useAppSelector } from '@/store/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { push, ref, set } from 'firebase/database'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { z } from 'zod'

const signUpSchema = z.object({
	videoReference: z.string().url('URL inválida').min(1, 'URL é obrigatória'),
	name: z.string().min(1, 'Nome é obrigatório'),
	category: z.string().min(1, 'Categoria é obrigatória'),
})

type SignUpFormData = z.infer<typeof signUpSchema>

export default function CreatePhysicalExercise() {
	const userId = useAppSelector((state) => state.user.uid)

	const [modalVisible, setModalVisible] = useState(false)

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
		setValue,
	} = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			videoReference: '',
			name: '',
			category: '',
		},
	})

	const handleSignUp = async (data: SignUpFormData) => {
		try {
			const { videoReference, name } = data
			const exercisesRef = ref(db, `exercises/${userId}`)
			const newExerciseRef = push(exercisesRef)

			await set(newExerciseRef, {
				videoReference,
				name,
				category,
			})

			Alert.alert('Sucesso', 'Exercício cadastrado com sucesso!')

			reset()
		} catch (error) {
			console.error('Erro ao cadastrar exercício:', error)
			Alert.alert('Erro', 'Não foi possível realizar o cadastro')
		}
	}

	const handleExerciseSelect = (category: string) => {
		setValue('category', category)
		setModalVisible(false)
	}

	const category = watch('category')

	return (
		<>
			<View className="flex-1 justify-center items-center p-5">
				<Controller
					control={control}
					name="videoReference"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							className="bg-white p-2 rounded-lg mb-2 text-base w-full"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							placeholder="URL do Vídeo de Referência"
						/>
					)}
				/>
				{errors.videoReference && (
					<Text className="text-red-500 mb-4 w-full">
						{errors.videoReference.message?.toString()}
					</Text>
				)}

				<Controller
					control={control}
					name="name"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							className="bg-white p-2 rounded-lg mb-2 text-base w-full"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							placeholder="Nome"
						/>
					)}
				/>
				{errors.name && (
					<Text className="text-red-500 mb-4 w-full ">
						{errors.name.message?.toString()}
					</Text>
				)}
				<TouchableOpacity
					className="bg-slate-500  px-2 py-3 rounded-lg mb-2 text-base w-full"
					onPress={() => {
						setModalVisible(true)
					}}
					activeOpacity={0.8}
				>
					<Text className="text-white">
						{category || 'Selecionar categoria'}
					</Text>
				</TouchableOpacity>
				{errors.category && (
					<Text className="text-red-500 mb-4 w-full ">
						{errors.category?.message}
					</Text>
				)}

				<TouchableOpacity
					className="bg-red-500 rounded-lg p-4 w-full"
					onPress={handleSubmit(handleSignUp)}
				>
					<Text className="text-white text-center text-xl">Cadastrar</Text>
				</TouchableOpacity>
			</View>
			<ModalSelectCategoryExercise
				handleCategorySelect={handleExerciseSelect}
				modalVisible={modalVisible}
				setModalVisible={() => setModalVisible((s) => !s)}
			/>
		</>
	)
}
