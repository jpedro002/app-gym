import {
	type Exercise,
	setCurrentIndex,
	setExerciseDoneState,
} from '@/store/slices/workoutSlice'
import React from 'react'
import { Text, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import { useDispatch } from 'react-redux'
import { LeftAction } from './LeftAction'
import { RightActions } from './RightActions'

export const FlatListItem = ({
	item,
	index,
}: {
	item: Exercise
	index: number
}) => {
	const dispatch = useDispatch()

	const onMarkAsDone = () => {
		dispatch(setExerciseDoneState({ index, isDone: true }))
	}

	const onUnmarkDone = (close: () => void) => {
		dispatch(setExerciseDoneState({ index, isDone: false }))
		close()
	}

	const onSetCurrentIndex = (close: () => void) => {
		dispatch(setCurrentIndex(index))
		close()
	}

	return (
		<Swipeable
			renderLeftActions={() => {
				return <LeftAction onMarkAsDone={onMarkAsDone} />
			}}
			renderRightActions={(_, __, { close }) => (
				<RightActions
					onUnmarkDone={() => onUnmarkDone(close)}
					onSetCurrentIndex={() => onSetCurrentIndex(close)}
				/>
			)}
			onSwipeableOpen={(direction, { close }) => {
				if (direction === 'left') {
					if (!item.isDone) onMarkAsDone()
					close()
				}
			}}
			overshootLeft={false}
			overshootRight={false}
			leftThreshold={50}
			rightThreshold={40}
		>
			<View
				className={`p-4 rounded-lg shadow-lg mb-4 ${
					item.isDone ? 'bg-green-100' : 'bg-white'
				}`}
			>
				<Text
					className={`text-lg font-bold ${item.isDone ? 'line-through text-gray-500' : ''}`}
				>
					{item.name}
				</Text>
				<View className="flex-row justify-between mt-2">
					<Text className={`${item.isDone ? 'text-gray-400' : ''}`}>
						Series: {item.series}
					</Text>
					<Text className={`${item.isDone ? 'text-gray-400' : ''}`}>
						Repetições: {item.repetitions}
					</Text>
				</View>
			</View>
		</Swipeable>
	)
}
