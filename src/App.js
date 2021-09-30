import "./App.css";
import { Switch, Route } from "react-router-dom";
import {useState} from 'react'
import Navbar from "./components/navbar";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import NewProductPage from "./pages/NewProductPage";
import BookingPage from "./pages/BookingPage";
import Popup from './components/Popup'
import Footer from "./components/footer";

import ProfilePage from "./pages/ProfilePage"
import * as PATHS from "./utils/paths";

import PrivateRoute from "./components/PrivateRoute";    // <== IMPORT
import AnonRoute from "./components/AnonRoute";        // <== IMPORT

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
      <Switch>  
        <AnonRoute exact path={PATHS.HOMEPAGE} component={HomePage} />
        <AnonRoute exact path={PATHS.PRODUCTSLIST} component={ProductListPage} />
{/*         <AnonRoute exact path={PATHS.PRODUCTDETAILS} component={ProductDetailsPage} />
 */}    <AnonRoute exact path={PATHS.NEWPRODUCT} component={NewProductPage} />
        <AnonRoute exact path={PATHS.BOOKING} component={BookingPage} />
        <PrivateRoute exact path={PATHS.PROFILE} component={ProfilePage} />
        <Route exact path={PATHS.PRODUCTS} component={ProductListPage} />
        <Route exact path={PATHS.PRODUCTDETAILS} component={ProductDetailsPage} />
        
        {/* 👇 UPDATE THE EXISTING ROUTES 👇 
        <PrivateRoute exact path="/projects" component={ProjectListPage} />
        <PrivateRoute exact path="/projects/:id" component={ProjectDetailsPage} />
        <PrivateRoute exact path="/projects/edit/:id" component={EditProjectPage} />
      
        <AnonRoute exact path="/login" component={LoginPage} /> */}
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
