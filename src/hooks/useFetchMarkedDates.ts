import { db } from '@/config/firebaseConfig'
import { useAppSelector } from '@/store/store'
import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'

interface MarkedDate {
	[key: string]: {
		selected?: boolean
		marked?: boolean
		selectedColor?: string
	}
}

export function useFetchMarkedDates() {
	const [markedDates, setMarkedDates] = useState<MarkedDate>({})
	const userId = useAppSelector((state) => state.user.uid)

	useEffect(() => {
		if (!userId) return

		const datesRef = ref(db, `workoutsClompleted/${userId}`)
		const unsubscribe = onValue(
			datesRef,
			(snapshot) => {
				const data = snapshot.val()
				if (data) {
					console.log(JSON.stringify(data, null, 2))
					const formattedDates = Object.values(data).reduce(
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						(acc: MarkedDate, entry: any) => {
							if (entry.date) {
								const dateKey = new Date(entry.date).toISOString().split('T')[0]
								acc[dateKey] = {
									selected: true,
									marked: true,
								}
							}
							return acc
						},
						{},
					)

					setMarkedDates(formattedDates as MarkedDate)
				}
			},
			(error) => {
				console.error('Erro ao buscar datas:', error)
			},
		)

		return () => unsubscribe()
	}, [userId])

	return markedDates
}
