import "./App.css";
import { Switch, Route } from "react-router-dom";
import {useState} from 'react'
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import NewProductPage from "./pages/NewProductPage";
import BookingPage from "./pages/BookingPage";
import Popup from './components/Popup'
import MyNetwork from './components/chatComponents/MyNetwork';
import Messaging from './components/chatComponents/Messaging';
import ProfilePage from "./pages/ProfilePage"
import * as PATHS from "./utils/paths";
import PrivateRoute from "./components/PrivateRoute";    

function App() {

  const[isShowForm, setIsShowForm]=useState(false)

  function toggleShowForm(){
    setIsShowForm(!isShowForm)
  }

  return (
    <div className="App">
    {isShowForm && <Popup clickToShow={toggleShowForm}/>}
      <Navbar clickToShow={toggleShowForm}/>
      <div className="body-switch">
      <Switch>  
        <Route exact path={PATHS.HOMEPAGE} component={HomePage} />
        <PrivateRoute exact path={PATHS.NEWPRODUCT} component={NewProductPage} clickToShow={toggleShowForm}/>
        <PrivateRoute exact path={PATHS.BOOKING} component={BookingPage} />
        <PrivateRoute exact path={PATHS.PRODUCTDETAILS} component={ProductDetailsPage} clickToShow={toggleShowForm} />
        <PrivateRoute exact path={PATHS.PROFILE} component={ProfilePage} clickToShow={toggleShowForm}/>
        <PrivateRoute path="/mynetwork" component={MyNetwork}/>
        <PrivateRoute path="/messaging" component={Messaging}/> 
      </Switch>
      </div>
    </div>
  );
}

export default App;
