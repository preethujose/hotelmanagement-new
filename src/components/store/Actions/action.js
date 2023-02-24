export const STORE_SELECTED_HOTEL='STORE_SELECTED_HOTEL'
export const STORE_HOTEL_LIST='STORE_HOTEL_LIST'
export const STORE_BOOKING_DETAILS='STORE_BOOKING_DETAILS'

export function StoreHotelList(payload) {
    return {
        type: STORE_HOTEL_LIST,
        payload: payload
    }
}
export function StoreSelectedHotel(payload) {
    return {
        type: STORE_SELECTED_HOTEL,
        payload: payload
    }
}