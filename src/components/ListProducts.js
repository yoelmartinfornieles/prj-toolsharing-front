import ProductCard from './ProductCard'

function ListProducts(props) {

  const {products} = props;
  let productsToShow = products.data
  console.log ("ListProducts product array is: ", productsToShow)
  
if (products) {

  return (
    <div className="cards-container">
      {productsToShow.map((product) => (
        <>
        <ProductCard key={product._id} product={product}/>
        </>
      ))}      
    </div>
  );
} else {

  return (
    <p>Loading ...productlist</p>
  )

  }
}

export default ListProducts;
