import { Link } from "react-router-dom";
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "./../context/auth.context";  // <== IMPORT
import {NEWPRODUCT, PROFILE} from "../utils/paths";
import home from '../images/home-white.png'
import plus from '../images/plus-white.png'
import userIcon from '../images/user-white.png'

function Navbar(props) {

  const handleClick = ((e)=>{
    setTimeout(() => {
      window.location.reload(false);
    }, 1);
  })

  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link className="navbar-button" to="/" onClick = {handleClick} ><img src={home} alt="Home"/></Link>
      <Link className="navbar-button" to={NEWPRODUCT}><img src={plus} alt="Plus" /></Link>
      {user? <Link className="navbar-button" to={PROFILE}><img alt="" src={userIcon}/></Link> : <button className="navbar-button" onClick={props.clickToShow}><p>LogIn</p></button>}
    </nav>
  );
}

export default Navbar;