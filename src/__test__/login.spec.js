import { render, screen ,getByText, getByRole, fireEvent, within} from "@testing-library/react";
import LoginComponent from "../components/Login/LoginComponent";
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from "@testing-library/user-event";

describe('With React Testing Library', () => {
    const initialState = {output:10}
    const mockStore = configureStore()
    let store,wrapper
  
    it('Shows "Login"', () => {
      store = mockStore(initialState)
      const { getByText } = render(<Provider store={store}><Router><LoginComponent /></Router></Provider>)
  
    //   expect(screen.getByTestId('Username')).toBeInTheDocument()
    const activeComponent = screen.getByTestId( 'head' );
    expect( activeComponent ).toHaveTextContent('Login');
    })
    it('Shows "username"', () => {
        store = mockStore(initialState)
        const { getByText } = render(<Provider store={store}><Router><LoginComponent /></Router></Provider>)
    
        expect(screen.getByText('Username')).toBeInTheDocument()
      })
      it('Shows "password"', () => {
        store = mockStore(initialState)
        const { getByText } = render(<Provider store={store}><Router><LoginComponent /></Router></Provider>)
    
        expect(screen.getByText('Password')).toBeInTheDocument()
      })

    //   it('Shows "userType"', () => {
    //     store = mockStore(initialState)
    //     const { wraper } = render(<Provider store={store}><Router><LoginComponent /></Router></Provider>)
    //     // render(<App />);
    //     // fireEvent.click(screen.getByTestId("userType"));
    //     // fireEvent.click(screen.getByTestId("Admin"));
    //     // expect(screen.getByText("Admin")).toBeInTheDocument();
    //     fireEvent.mouseDown(screen.getByTestId('userType'));

    //     const listbox = within(screen.getByRole('button'));
      
    //     fireEvent.click(listbox.getByText(/Admin/i));
      
    //     // expect(getByRole('heading')).toHaveTextContent(/my account/i);
    //     expect(screen.getByText("Admin")).toBeInTheDocument();
    //   })

      it('Shows "login button"', () => {
        store = mockStore(initialState)
        const { getByText } = render(<Provider store={store}><Router><LoginComponent /></Router></Provider>)
    
        const button = screen.getByTestId('button');
        expect( button ).toHaveTextContent(/LOGIN/i);
      })
  })