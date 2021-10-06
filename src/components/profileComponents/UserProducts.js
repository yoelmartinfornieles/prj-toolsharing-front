import axios from "axios"
import EditProduct from "./EditProduct"

const API_URL = process.env.REACT_APP_API_URL;

function UserProduct(props) {
   
    const { products } = props.userInfo.data
    console.log("USERPRODUCT", products)

    const handleSubmit = (id) => {
            axios.delete(`${API_URL}/product/${id}`)
                 .then(response => console.log("PRODUCTO BORRADO", response))
                 .catch(err => console.log(err))

    }

    return (
        <div>
        <div>
            <h3>PRODUCTS</h3>
        </div>
        {products.map(product => (
            <div key={product._id}>
                <p>Producto: {product.name}</p>
                <p>Descripción: {product.description}</p>
                <p>Precio: {product.amount}</p>
                <p>Categoría: {product.category}</p>
                <p>Año de adquisición: {product.adquisitionYear}</p>
                <button onClick={() => handleSubmit(product._id)}>Borrar producto</button>
                <EditProduct product={product} />
            </div>
        ))
        }
        </div>
  )}
  
  export default UserProduct;