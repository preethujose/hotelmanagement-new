import { render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';

import { useAppDispatch,useAppSelector } from '../components/store/redux-hooks';
import { testUseAppSelector } from "../components/store/test-app-selector";
import BookingDetails from "../components/HomeBaseComponent/BookingDetails";

jest.mock('../components/store/redux-hooks')

sessionStorage.setItem("userType", JSON.stringify({
    "userName": "user1",
    "userType": "User"
}));



describe('testing Hotel page', () => {
    const dispatch=jest.fn()

    beforeEach(()=>{
        useAppSelector.mockImplementation(testUseAppSelector)
        useAppDispatch.mockImplementation(()=>dispatch)
    })
    afterEach(()=>{
        jest.clearAllMocks()
    })
    it('test hotel list with search and filter', () => {

      render(<Router><BookingDetails/></Router>)
        expect(screen.getByText(/BOOKING DETAILS/i)).toBeVisible()
        expect(screen.getByText(/Hotel Name/i)).toBeVisible()
        expect(screen.getByText(/Check-in Date/i)).toBeVisible()
        expect(screen.getByText(/Check-out Date/i)).toBeVisible()
        expect(screen.getByText(/Number of rooms booked/i)).toBeVisible()
        expect(screen.getByText(/Amount/i)).toBeVisible()


    })
   
   
})