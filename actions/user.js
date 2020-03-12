import Firebase, { db, increment } from '../config/firebase_config'
// Definitions

export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'
export const UPDATE_COUNT = 'UPDATE_COUNT'


// Actions

export const updateEmail = email => {
    return {
        type: UPDATE_EMAIL,
        payload: email
    }
}

export const updatePassword = password => {
    return {
        type: UPDATE_PASSWORD,
        payload: password
    }
}

export const updateCount = count => {
    return {
        type: UPDATE_COUNT,
        payload: count
    }
}

export const login = () => {
	return async (dispatch, getState) => {
		try {
			const { email, password } = getState().user
			const response = await Firebase.auth().signInWithEmailAndPassword(email, password)
			dispatch(getUser(response.user.uid))
		} catch (e) {
			alert(e)
		}
	}
}

export const getUser = uid => {
    return async (dispatch, getState) => {
        try {
            const user = await db
                .collection('users')
                .doc(uid)
                .get()

            dispatch({ type: LOGIN, payload: user.data() })
        } catch (e) {
            alert(e)
        }
    }
}

export const signup = () => {
    return async (dispatch, getState) => {
        try {
            const { email, password } = getState().user
            console.log(getState())
            const response = await Firebase.auth().createUserWithEmailAndPassword(email, password)
            if (response.user.uid) {
                const user = {
                    uid: response.user.uid,
                    email: email,
                    count: 0
                }

                db.collection('users')
                    .doc(response.user.uid)
                    .set(user)

                dispatch({ type: SIGNUP, payload: user })
            }
        } catch (e) {
            alert(e)
        }
    }
}

export const incrementCounter = () => {
	return async (dispatch, getState) => {
		try {
            const { uid } = getState().user
			dispatch(updateIncrement(uid))
		} catch (e) {
			alert(e)
		}
	}
}

export const updateIncrement = uid => {
    return async (dispatch, getState) => {
        let ref = db.collection('users').doc(uid)
        try {
            const incremented = await ref.update({count: increment})
            
            let snap = await ref.onSnapshot(docSnapshot => {
                console.log(docSnapshot.data())
                dispatch({ type: SIGNUP, payload: docSnapshot.data() })
              }, err => {
                console.log(`Encountered error: ${err}`);
              });

        } catch (e) {
            alert(e)
        }
    }
}