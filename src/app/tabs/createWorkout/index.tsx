import { ButtonNavigate } from '@/components/createWorkout/ButtonNavigate'
import constants from 'expo-constants'
import { type Href, useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const { statusBarHeight } = constants

export default function CreateWorkoutScreen() {
	const router = useRouter()

	const handleNavigateTo = (href: Href<string | object>) => router.push(href)

	return (
		<View
			className="flex-1 items-center p-5 pt-0"
			style={{ paddingTop: statusBarHeight + 20 }}
		>
			<ButtonNavigate
				handleNavigateTo={() =>
					handleNavigateTo('/tabs/createWorkout/createPhysicalExercise')
				}
				title="Criar Exercício "
			/>
			<ButtonNavigate
				handleNavigateTo={() =>
					handleNavigateTo('/tabs/createWorkout/createPhysicalExercise')
				}
				title="Criar Treino "
			/>
			<ButtonNavigate
				handleNavigateTo={() =>
					handleNavigateTo('/tabs/createWorkout/createPhysicalExercise')
				}
				title="Listar exercicios"
			/>
			<ButtonNavigate
				handleNavigateTo={() =>
					handleNavigateTo('/tabs/createWorkout/createPhysicalExercise')
				}
				title="Listar treinos"
			/>
		</View>
	)
}
