import SearchBar from "./SearchBar"
import { Link } from "react-router-dom";

function NavbarTopMobile() {
  return (
    <nav className="top-navbar">
      <Link to="/">
        <img src="./tooly-logo.png" alt="Tooly logo" />
      </Link>
      <SearchBar />
    </nav>
  );
}
export default NavbarTopMobile;