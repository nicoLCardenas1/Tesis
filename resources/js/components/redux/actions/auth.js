import { types } from "../types/types"


export const login = (uid, displayName, email) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
        email
    }
})

export const test = () => ({
    type: types.test,
    payload: {
        test: 'hola mundo'
    }
})

export const dataUser = (id, role, name, ies) => ({
    type: types.userActive,
    payload: {
        id, role, name, ies
    }
})


export const startLogout = () => {
    return async (dispatch) => {
        dispatch(logout());
        localStorage.clear();
    }
}

export const logout = () => ({
    type: types.logout
})