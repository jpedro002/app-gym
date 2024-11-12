import type { Exercise } from '@/store/slices/workoutSlice'
import React from 'react'
import { FlatList } from 'react-native'
import { FinishWorkoutButton } from './FinishWorkoutButton'
import { FlatListItem } from './FlatListItem'

export const ExerciseList = ({
	exercises,
	handleFinish,
}: { exercises: Exercise[]; handleFinish: () => void }) => {
	return (
		<FlatList
			data={exercises}
			renderItem={({ item, index }) => {
				if (index + 1 === exercises.length) {
					return (
						<>
							<FlatListItem item={item} index={index} />
							<FinishWorkoutButton handleFinish={handleFinish} />
						</>
					)
				}
				return <FlatListItem item={item} index={index} />
			}}
			keyExtractor={(item, index) => item.name + index}
			style={{ paddingHorizontal: 10 }}
		/>
	)
}
