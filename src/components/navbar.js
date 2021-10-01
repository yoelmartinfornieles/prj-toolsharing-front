import { Link } from "react-router-dom";
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "./../context/auth.context";  // <== IMPORT
import {NEWPRODUCT} from "../utils/paths";

function Navbar(props) {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link className="navbar-button" to="/"><h3>Home</h3></Link>
      <Link className="navbar-button" to={NEWPRODUCT}><h3>+</h3></Link>
      <Link dclassName="navbar-button" onClick={props.clickToShow}><h3>Log In</h3></Link>
      <Link className="navbar-button" onClick={logOutUser} to="/projects"> Cerrar sessiion picha </Link>

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