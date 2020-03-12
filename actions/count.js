import Firebase, { db, increment } from '../config/firebase_config'

// Definitions

export const INCREMENT = 'INCREMENT'
export const UPDATE_COUNT = 'UPDATE_COUNT'

// Actions

export const updateCount = count => {
    return {
        type: UPDATE_COUNT,
        payload: count
    }
}

export const incrementCount = count => {
    return async (dispatch, getState) => {
		try {
            console.log(getState())
			const { count } = getState().user
			const response = await Firebase.auth().signInWithEmailAndPassword(email, password)
            console.log(response.user)
			dispatch(getUser(response.user.uid))
		} catch (e) {
			alert(e)
		}
	}
}

export const getUser = uid => {
    return async (dispatch, getState) => {
        try {
            const count = await db
                .collection('users')
                .doc(uid)
                .update({reads: increment})

            dispatch({ type: INCREMENT, payload: count })
        } catch (e) {
            alert(e)
        }
    }
}