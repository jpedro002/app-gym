import { ExerciseList } from '@/components/CurrentWorkout/ExerciseList'
import VideoPlayer from '@/components/CurrentWorkout/VideoPlayer'
import { useCurrentWorkout } from '@/hooks/useCurrentWorkout'

import { View } from 'react-native'

const CurrentWorkout = () => {
	const { crrExercise, currentWorkout, handleFinishWorkout } =
		useCurrentWorkout()

	return (
		<View className="flex-1 bg-[#f0f0f0] ">
			<VideoPlayer videoUrl={crrExercise?.videoReference} />
			<ExerciseList
				exercises={currentWorkout?.exercises || []}
				handleFinish={handleFinishWorkout}
			/>
		</View>
	)
}

export default CurrentWorkout
