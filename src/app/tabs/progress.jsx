import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { db } from '@/config/firebaseConfig'
import { push, ref, set } from 'firebase/database'

const data = [
	{
		name: 'supino inclinado com halteres alternado',
		videoReference: 'https://www.youtube.com/watch?v=OYM_z3kba0s',
	},
	{
		name: 'toque nos ombros',
		videoReference: 'https://www.youtube.com/watch?v=Hy-YhHE7t3c',
	},
	{
		name: 'supino com halteres alternados',
		videoReference: 'https://www.youtube.com/watch?v=pIp7GTOYHlA',
	},
	{
		name: 'crucifixo inclinado',
		videoReference: 'https://www.youtube.com/watch?v=X0IRmwQjQ3U',
	},
	{
		name: 'crucifixo (ou fly)',
		videoReference: 'https://www.youtube.com/watch?v=lkVPi_CdUxk',
	},
	{
		name: 'supino reto na máquina',
		videoReference: 'https://www.youtube.com/watch?v=w_4BlkVxjFc',
	},
	{
		name: 'supino inclinado com halteres',
		videoReference: 'https://www.youtube.com/watch?v=7J3lT46qo_Q',
	},
	{
		name: 'supino reto',
		videoReference: 'https://www.youtube.com/watch?v=rctqbCHejes',
	},
	{
		name: 'flexão saltando',
		videoReference: 'https://www.youtube.com/watch?v=Di_niSy9Zec',
	},
	{
		name: 'flexão',
		videoReference: 'https://www.youtube.com/watch?v=n4zvTG_ytG8',
	},
	{
		name: 'cross over',
		videoReference: 'https://www.youtube.com/watch?v=Ck5__jvLNSw',
	},
	{
		name: 'supino inclinado',
		videoReference: 'https://www.youtube.com/watch?v=P9iUlqchNQo',
	},
	{
		name: 'supino com halteres',
		videoReference: 'https://www.youtube.com/watch?v=E-vJa7sXuCE',
	},
	{
		name: 'flexão com joelhos',
		videoReference: 'https://www.youtube.com/watch?v=XMV1cJDxxKY',
	},
]

const ProgressScreen = () => {
	const createExercise = async (data, category) => {
		try {
			const { videoReference, name } = data
			const exercisesRef = ref(db, `exercises/public/${category}`)
			const newExerciseRef = push(exercisesRef)

			await set(newExerciseRef, {
				videoReference,
				name,
			})

			console.log('Sucesso', 'Exercício cadastrado com sucesso!')
		} catch (error) {
			console.error('Erro ao cadastrar exercício:', error)
			console.log('Erro', 'Não foi possível realizar o cadastro')
		}
	}

	const createExercises = async () => {
		for (const exer of data) {
			createExercise(exer, 'peito').then(() => {
				console.log('Exercício cadastrado com sucesso!')
			})
		}
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={createExercises}>
				<Text style={styles.text}>Cadastrar Exercícios</Text>
			</TouchableOpacity>
			<Text style={styles.text}>Acompanhar Progresso</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5', // Cor de fundo leve
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
	},
})

export default ProgressScreen
