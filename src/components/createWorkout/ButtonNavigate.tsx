import { Text, TouchableOpacity } from 'react-native'

interface ButtonNavigateProps {
	handleNavigateTo: () => void
	title: string
}
export const ButtonNavigate = ({
	handleNavigateTo,
	title,
}: ButtonNavigateProps) => {
	return (
		<TouchableOpacity
			onPress={handleNavigateTo}
			className="bg-[#ff0000] rounded-lg p-4 mb-4 w-full"
			activeOpacity={0.8}
		>
			<Text className="text-white font-bold text-center text-xl">{title}</Text>
		</TouchableOpacity>
	)
}
