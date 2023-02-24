import { fireEvent, render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';

import { useAppDispatch,useAppSelector } from '../components/store/redux-hooks';
import { testUseAppSelector } from "../components/store/test-app-selector";
import userEvent from "@testing-library/user-event";
import HotelList from "../components/HomeBaseComponent/HotelList";

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

      render(<Router><HotelList/></Router>)
        expect(screen.getByText(/Hotel List/i)).toBeVisible()
        expect(screen.getByTestId(/search/i)).toBeVisible()
        expect(screen.getByText(/Filter By Location/i)).toBeInTheDocument()


    })
    // describe('search Input value',  () => {
    //     it('updates on change', async () => {
    //         render(<Router><HotelList/></Router>)
      
    //         const inputEl = screen.getByTestId("search");
    //         await userEvent.type(inputEl, "Chandys");
         
    //         expect(screen.getByTestId("search")).toHaveValue("Chandys");
    //     })
    //   })

   
   
})