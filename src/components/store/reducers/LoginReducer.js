import { STORE_BOOKING_DETAILS, STORE_HOTEL_LIST, STORE_SELECTED_HOTEL, STORE_USER_DETAILS} from '../Actions/action'

const intialState = {
   hotelId:null,
   list:[],
   bookinglist:[]
}

const user = (state = intialState, action) => {
    if (action.type === STORE_SELECTED_HOTEL) {
        return Object.assign({}, state, { hotelId: action.payload });
    }
    else if (action.type === STORE_HOTEL_LIST) {
        return Object.assign({}, state, { list: action.payload });
    }
   
    else
    return state;
}
export default user