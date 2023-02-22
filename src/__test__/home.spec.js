import { render, screen, getByText, getByRole, fireEvent, within } from "@testing-library/react";
import HomeComponent from "../components/HomeBaseComponent/HomeComponent"
import configureStore from 'redux-mock-store'
import { Provider, useDispatch } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import MenuComponent from "../components/HomeBaseComponent/MenuComponent";

const initialState = {
    userDetails: {
        "userName": "user1",
        "userType": "User"
    },
    hotelId: null,
    list: [],
    bookinglist: []
}
const mockStore = configureStore()
const store = mockStore(initialState)
// const originalDispatch = store.dispatch;
// store.dispatch = jest.fn(originalDispatch)
// originalDispatch(initialState)
sessionStorage.setItem("userType", JSON.stringify({
    "userName": "user1",
    "userType": "User"
}));


describe('testing home page', () => {

    it('test app bar', () => {

      
        const { getByText } = render(<Provider store={store}><Router><HomeComponent /></Router></Provider>)

        expect(screen.getByText(/Hotel Management/i)).toBeInTheDocument()
        expect(screen.getByText(/Hotel List/i)).toBeInTheDocument()
        expect(screen.getByText(/Booking Details/i)).toBeInTheDocument()

    })

    it('Hotel List', () => {

      
        const { getByText } = render(<Router><MenuComponent /></Router>)


    })
})