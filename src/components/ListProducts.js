import ProductCard from './ProductCard'
    
  function ListProducts(props) {

  const {products} = props;
  console.log ("LISTPRODUCTs: ", products)  
  let productsToShow = products
  console.log ("ListProducts product array is: ", productsToShow)
  
if (products) {

  return (
    <>
{/*       <Filter setProductsByFilter={setProducts} products={products} />
 */}      <div className="cards-container">
        {productsToShow.map((product) => (
          <>
          <ProductCard key={product._id} product={product}/>
          </>
        ))}      
      </div>
    </>
  );
} else {

  return (
    <p>Loading ...</p>
  )

  }
}

export default ListProducts;
