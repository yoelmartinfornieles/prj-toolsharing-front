import "./App.css";
import { Switch, Route } from "react-router-dom";
import {useState} from 'react'
import Navbar from "./components/navbar";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import NewProductPage from "./pages/NewProductPage";
import BookingPage from "./pages/BookingPage";
import Popup from './components/Popup'
import MyNetwork from './chatComponents/MyNetwork';
import Messaging from './chatComponents/Messaging';
import ProfilePage from "./pages/ProfilePage"
import * as PATHS from "./utils/paths";
import PrivateRoute from "./components/PrivateRoute";    // <== IMPORT

function App() {

  const[isShowForm, setIsShowForm]=useState(false)

  function toggleShowForm(){
    setIsShowForm(!isShowForm)
    console.log(isShowForm)
  }

  return (
    <div className="App">
    {isShowForm && <Popup clickToShow={toggleShowForm}/>}
      <Navbar clickToShow={toggleShowForm}/>
      <div className="body-switch">
      <Switch>  

        {/* ------------REMEMBER THAT PRIVATEROUTES PROVIDES US WITH USER INFO----------------------*/ }

        <Route exact path={PATHS.HOMEPAGE} component={HomePage} />
        <PrivateRoute exact path={PATHS.NEWPRODUCT} component={NewProductPage} clickToShow={toggleShowForm}/>
        <PrivateRoute exact path={PATHS.BOOKING} component={BookingPage} />
        <PrivateRoute exact path={PATHS.NEWPRODUCT} component={NewProductPage} clickToShow={toggleShowForm}/>
        <PrivateRoute exact path={PATHS.PRODUCTDETAILS} component={ProductDetailsPage} clickToShow={toggleShowForm} />
        <PrivateRoute exact path={PATHS.PROFILE} component={ProfilePage} clickToShow={toggleShowForm}/>
        
        {/* ------------WIP: CHAT ROUTES-----------------------*/ }

        <PrivateRoute path="/mynetwork" component={MyNetwork}/>
        <PrivateRoute path="/messaging" component={Messaging}/> 
        
        {/* 👇 UPDATE THE EXISTING ROUTES 👇 
        <PrivateRoute exact path="/projects" component={ProjectListPage} />
        <PrivateRoute exact path="/projects/:id" component={ProjectDetailsPage} />
        <PrivateRoute exact path="/projects/edit/:id" component={EditProjectPage} />
        <AnonRoute exact path="/login" component={LoginPage} /> */}
      </Switch>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
