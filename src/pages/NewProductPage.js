import NewProductForm from "../components/NewProductForm"
import Logo from "../images/tooly-logo.png";

function NewProductPage(){
    return(
        <>
        <nav className="top-navbar">
        <img src={Logo} alt="Logo" />
      </nav>
        <div className="NewProduct">
        <h1>Let's add a new product!</h1>
        <NewProductForm/>
        </div>
        </>
    )
}

export default NewProductPage