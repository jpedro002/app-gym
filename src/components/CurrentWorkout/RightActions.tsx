import { ArrowUpRight, X } from 'lucide-react-native'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

export const RightActions = ({
	onUnmarkDone,
	onSetCurrentIndex,
}: {
	onUnmarkDone: () => void
	onSetCurrentIndex: () => void
}) => {
	return (
		<View className="flex-row w-[200px] mb-4">
			<TouchableOpacity
				onPress={onUnmarkDone}
				className="bg-orange-500 flex-1 rounded rounded-l-lg justify-center items-center"
			>
				<X size={24} color="white" />
			</TouchableOpacity>

			<TouchableOpacity
				onPress={onSetCurrentIndex}
				className="bg-blue-500 flex-1 rounded-r-lg justify-center items-center"
			>
				<ArrowUpRight size={24} color="white" />
			</TouchableOpacity>
		</View>
	)
}
