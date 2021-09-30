import { Link } from "react-router-dom";
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "./../context/auth.context";  // <== IMPORT
import {NEWPRODUCT} from "../utils/paths";

function Navbar(props) {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      <button onClick={props.clickToShow}>Signup or Login</button>
      <Link to={NEWPRODUCT}>New Product</Link>
-
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