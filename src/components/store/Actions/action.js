export const STORE_USER_DETAILS = 'STORE_USER_DETAILS'
export const STORE_SELECTED_HOTEL='STORE_SELECTED_HOTEL'
export const STORE_HOTEL_LIST='STORE_HOTEL_LIST'
export const STORE_BOOKING_DETAILS='STORE_BOOKING_DETAILS'
export function StoreUserDetails(payload) {
    return {
        type: STORE_USER_DETAILS,
        payload: payload
    }
}
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
export function StoreBookingDetails(payload) {
    return {
        type: STORE_BOOKING_DETAILS,
        payload: payload
    }
}
