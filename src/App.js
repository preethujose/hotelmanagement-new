import logo from './logo.svg';
import './App.css';
import LoginPage from './components/Login/LoginComponent';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import HomeComponent from './components/HomeBaseComponent/HomeComponent';
import HotelList from './components/HomeBaseComponent/HotelList';

function App() {
  return (
    <div className="App">
    <Router>
    <Route exact path="/" component={LoginPage} />

<Switch>
    <Route path="/home" component={HomeComponent} />
    {/* <Route path="/list" component={HotelList} /> */}

    {/* <Redirect to={LoginPage} /> */}
</Switch>
</Router>
    </div>
  );
}

export default App;
