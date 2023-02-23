import { render, screen, getByText, getByRole, fireEvent, within, getByTestId } from "@testing-library/react";
import ShallowRenderer from 'react-test-renderer/shallow'; 
import HomeComponent from "../components/HomeBaseComponent/HomeComponent"
import configureStore from 'redux-mock-store'
import { Provider, } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import MenuComponent from "../components/HomeBaseComponent/MenuComponent";
import BookingDetails from "../components/HomeBaseComponent/BookingDetails";
import * as reactRedux from 'react-redux'

import { useAppDispatch,useAppSelector } from '../components/store/redux-hooks';
import { testUseAppSelector } from "../components/store/test-app-selector";
import userEvent from "@testing-library/user-event";
import HotelList from "../components/HomeBaseComponent/HotelList";

jest.mock('../components/store/redux-hooks')

sessionStorage.setItem("userType", JSON.stringify({
    "userName": "user1",
    "userType": "User"
}));



describe('testing home page', () => {
    const dispatch=jest.fn()

    beforeEach(()=>{
        useAppSelector.mockImplementation(testUseAppSelector)
        useAppDispatch.mockImplementation(()=>dispatch)
    })
    afterEach(()=>{
        jest.clearAllMocks()
    })
    it('test app bar', () => {

      render(<Router><HomeComponent/></Router>)
    //     const { getByText } = render(<Provider store={store}><Router><HomeComponent /></Router></Provider>)

        expect(screen.getByText(/Hotel Management/i)).toBeInTheDocument()
        expect(screen.getByText(/Hotel List/i)).toBeInTheDocument()
        expect(screen.getByText(/Booking Details/i)).toBeInTheDocument()

    })

    it('clicks booking details',()=>{
        render(<Router><MenuComponent/></Router>)
        render(<Router><BookingDetails/></Router>)

        const btn=screen.getByTestId('menubooking')
        userEvent.click(btn)
        expect(screen.getByText('BOOKING DETAILS')).toBeInTheDocument()
        
    })

    it('clicks hotel list',()=>{
        render(<Router><MenuComponent/></Router>)
        render(<Router><HotelList/></Router>)

        const btn=screen.getByTestId('menulist')
        userEvent.click(btn)
        expect(screen.getByText('HOTEL LIST')).toBeInTheDocument()
        
    })

   
})