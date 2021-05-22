import { types } from "../types/types";

const initialState = {
    offers: null
}
export const offerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.offersList:
            return {
                ...state,
                offers: action.payload.offers
            }
        case types.addOffer:
            return {
                ...state,
                offers: [action.payload.offer, ...state.offers]
            }
        default:
            return state;
    }
}