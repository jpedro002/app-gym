import { Check } from 'lucide-react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export const LeftAction = ({ onMarkAsDone }: { onMarkAsDone: () => void }) => {
	return (
		<TouchableOpacity
			onPress={onMarkAsDone}
			className="w-28 bg-[#00b960] justify-center items-center rounded-lg mb-4"
		>
			<Check size={24} color="white" />
		</TouchableOpacity>
	)
}
