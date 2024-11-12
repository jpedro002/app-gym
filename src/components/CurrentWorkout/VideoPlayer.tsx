import React, { useState } from 'react'
import { View } from 'react-native'
import YouTubeIframe from 'react-native-youtube-iframe'

type VideoPlayerProps = {
	videoUrl?: string
}

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
	const videoId = videoUrl?.split('v=')[1]?.split('&')[0]

	if (!videoUrl || !videoId) {
		return <View className="w-full h-[230px] animate-pulse bg-gray-600" />
	}

	return (
		<View className="w-full h-[230px] bg-[#f0f0f0] ">
			<YouTubeIframe
				videoId={videoId}
				height={230}
				mute
				onReady={() => {
					console.log('Ready')
				}}
				onError={(e) => console.log('Error:', e)}
			/>
		</View>
	)
}

export default VideoPlayer
