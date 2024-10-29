import { auth, db } from '@/libs/firebase'
import { setLoading, setUser } from '@/store/slices/userSlice'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from '@firebase/auth'
import { doc, getDoc, setDoc } from '@firebase/firestore'
import { useRouter } from 'expo-router'
import { useDispatch } from 'react-redux'

const useAuth = () => {
	const router = useRouter()

	const dispatch = useDispatch()

	const registerUser = async (userInfos: any) => {
		const { email, password, ...rest } = userInfos

		try {
			dispatch(setLoading(true))

			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email.trim(),
				password.trim(),
			)
			const user = userCredential.user

			await setDoc(doc(db, 'users', user.uid), {
				email: user.email,
				...rest,
			})

			router.push(`/auth/login?email=${encodeURIComponent(email)}`)

			console.log('here')
		} catch (error) {
			if (error instanceof Error) {
				console.error('Erro ao criar usuário:', error.message)
			} else {
				console.error('Erro desconhecido ao criar usuário')
			}
		} finally {
			dispatch(setLoading(false))
		}
	}

	const signin = async ({
		email,
		password,
	}: { email: string; password: string }) => {
		try {
			dispatch(setLoading(true))

			const userCredential = await signInWithEmailAndPassword(
				auth,
				email.trim(),
				password.trim(),
			)

			if (userCredential.user) {
				const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
				if (userDoc.exists()) {
					const userData = await userDoc.data()
					console.log(userData, 'log here')

					dispatch(
						setUser({
							uid: userCredential.user.uid,
							loading: false,
							email,
							firstName: userData.firstName,
							lastName: userData.lastName,
							userType: userData.userType,
						}),
					)
				}
				router.push('/(home)')
			}
		} catch (_error) {
			throw new Error('Erro ao tentar autenticar.')
		} finally {
			dispatch(setLoading(false))
		}
	}

	return {
		signin,
		registerUser,
	}
}

export default useAuth
