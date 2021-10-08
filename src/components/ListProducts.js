import ProductCard from './ProductCard'
    
  function ListProducts(props) {

  const {products} = props;
  let productsToShow = products
  
if (products.length > 0) {

  return (
       <div className="cards-container">
        {productsToShow.map((product) => (     
          <ProductCard key={product._id} product={product}/>
        ))}      
      </div>
  );
} else if (products.length === 0){

  return (
    <div className="not-found">
    <img src="./no-results.png" alt="no results" />
    </div>
  )

  } else { 
    return (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default ListProducts;
