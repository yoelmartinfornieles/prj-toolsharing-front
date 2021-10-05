import Carrusel from "../components/carrusel"
import HomeCategories from "../components/HomeCategories";
import ListProducts from "../components/ListProducts"
import {useState, useEffect} from "react"
import SearchBar from "../components/SearchBar"
import Filter from "../components/Filter"


function HomePage(props) {  

  //const {products, setProducts} = props;
  const [products, setProducts] = useState([])
  const [productsCopy, setProductsCopy] = useState([])

  const [fetch, setFetch] = useState(false)


  const [thereAreProducts, setThereAreProducts] = useState (false)
   
  console.log("PRODUCTS", products)
  console.log("PRODUCTS COPY", productsCopy)

  useEffect(() => {
    setTimeout(() => {
      setProductsCopy(products)
      
    }, 100);
  }
  ,[products, fetch]) 

 

  //RECORDAR: hay que pasar a HomePage products

  if (thereAreProducts){
   return (
    <>
      <nav className="top-navbar">
      <img src="./tooly-logo.png" alt="Logo"/>
      <SearchBar setProductsBySearch={setProducts} setThereAreProducts={setThereAreProducts}/>
      </nav>
      {/* <button onClick={handleShowFilter}>Filtro</button> */}

      <Filter products={products} setProductsCopy={setProductsCopy} setFetch={setFetch}/> 


    {/*   <Filter products={products} setProductsCopy={setProductsCopy}/> */}
      <ListProducts products={productsCopy} setProducts={setProducts}/>
      

      <p>hola</p>
    </>
  )
   }
  else
  {
  return (
    <div className="home-page">
    <div className="top-home">
      <h1>What are you looking for?</h1>
    </div>
    <nav className="top-navbar">
    <img src="./tooly-logo.png" alt="Logo"/>
        <SearchBar setProductsBySearch={setProducts} setThereAreProducts={setThereAreProducts}/>
      </nav>
      <HomeCategories setProductsByCategory={setProducts} setThereAreProducts={setThereAreProducts}/>
      <Carrusel/> 
   
      <div className="info-home">
        <h1>Find a solution to bring your ideas to life or offer your tools to get the most out of them.</h1>
        <div>
          <img src="./how-it-works.png" alt="Graphic explaining how the page"/>
        </div>
      </div>
    </div>
  );
  } 
}

export default HomePage;