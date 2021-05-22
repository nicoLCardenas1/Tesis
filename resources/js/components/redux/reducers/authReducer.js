import { types } from "../types/types";

const initialState = {
    user_id: null,
    role: null
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.test:
            return {
                ...state,
                test: action.payload.test
            }
        case types.userActive:
            return {
                ...state,
                user_id: action.payload.id,
                role: action.payload.role,
                name: action.payload.name,
                ies: action.payload.ies,
            }
        default:
            return state;
    }
}