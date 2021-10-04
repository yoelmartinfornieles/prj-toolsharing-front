import Carrusel from "../components/carrusel"
import HomeCategories from "../components/HomeCategories";
import ListProducts from "../components/ListProducts"
import {useState} from "react"
import SearchBar from "../components/SearchBar"

function HomePage(props) {  

  //const {products, setProducts} = props;
  const [products, setProducts] = useState([])
  const [thereAreProducts, setThereAreProducts] = useState (false)

/*   useEffect(() => {
    setProducts (productsByCategory)
  }
  ,[productsByCategory]) */

  //RECORDAR: hay que pasar a HomePage products

  if (thereAreProducts){
   return (
    <>
      <nav className="top-navbar">
        <SearchBar setProductsBySearch={setProducts} setThereAreProducts={setThereAreProducts}/>
      </nav>
      <ListProducts products={products}/>
    </>
  )
   }
  else
  {
  return (
    <>
      <nav className="top-navbar">
        <SearchBar setProductsBySearch={setProducts} setThereAreProducts={setThereAreProducts}/>
      </nav>
      <HomeCategories setProductsByCategory={setProducts} setThereAreProducts={setThereAreProducts}/>
      <Carrusel/> 
    </>
  );
  } 
}

export default HomePage;