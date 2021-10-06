import ProductCard from './ProductCard'
    
  function ListProducts(props) {

  const {products} = props;
  console.log ("LISTPRODUCTs: ", products)  
  let productsToShow = products
  console.log ("ListProducts product array is: ", productsToShow)
  
if (products.length > 0) {

  return (
    <>
       {/* <Filter setProductsByFilter={setProducts} products={products} /> */}
       <div className="cards-container">
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
    <div>
    <img width="400" src="https://smartbookings.rw/views/assets/images/no_result.gif"/>
    </div>
  )

  }
}

export default ListProducts;
