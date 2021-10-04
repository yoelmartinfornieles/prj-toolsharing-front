import { Link } from "react-router-dom";
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "./../context/auth.context";  // <== IMPORT
import {NEWPRODUCT, PROFILE} from "../utils/paths";

function Navbar(props) {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  //  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const { logOutUser } = useContext(AuthContext);

  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link className="navbar-button" to="/"><img src="./home-white.png" alt="Home" /></Link>
      <Link className="navbar-button" to={NEWPRODUCT}><img src="./plus-white.png" alt="Plus" /></Link>
      {/* esto de abajo deberia de ser un boton? */}
      {/* Condicional con authcontext para hacer switch del boton*/}
      {/* {user? <button className="navbar-button" to="/" onClick={logOutUser} ><p>log out</p></button> : <button className="navbar-button" onClick={props.clickToShow}><p>log in</p></button>} */}
      {user? <a className="navbar-button" href={PROFILE}><img src="./user-white.png"/></a> : <button className="navbar-button" onClick={props.clickToShow}><p>LogIn</p></button>}

      {/* ------------WIP: CHAT LINKS-----------------------*/ }

{/*       <Link to="/mynetwork" className="navbar-link">My Network</Link>
      <Link to="/messaging" className="navbar-link">Messaging</Link> */}
      {/* {isLoggedIn
        ? (<>
            <Link to="/projects">
              <button>Projects</button>
            </Link>
            <button onClick={logOutUser}>Logout</button>
            <span>{user.name}</span>
          </>)
        : 
        (<>
          <Link to="/signup"> <button>Signup</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>)
      } */}
    </nav>
  );
}

export default Navbar;