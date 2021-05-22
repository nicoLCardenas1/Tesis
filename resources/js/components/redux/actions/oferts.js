import { loadOffers } from "../hlpers/LoadOffers";
import { types } from "../types/types"

export const offers = () => {
    return async (dispatch) => {
        const offers = await loadOffers();
        dispatch(setOffers(offers))
    }
}

export const setOffers = (offers) => ({
    type: types.offersList,
    payload: {
        offers
    }
})

export const createOffer = (offer) => ({
    type: types.addOffer,
    payload: offer
})