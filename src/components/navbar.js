import {Link} from 'react-router-dom'
import {NEWPRODUCT} from "../utils/paths";

function Navbar(props) {
  
  

  return (
    <div className="navbar">
      <h1>Navbar</h1>

      <button onClick={props.clickToShow}>Signup or Login</button>
      <Link to={NEWPRODUCT}>New Product</Link>

    </div>
  );
}

export default Navbar;