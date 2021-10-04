import React from "react";
//import Signup from "./signup";
//import Login from "./login";

function UserInfo(props) {
  console.log ("tpm: ", props)
  const {username, address , email, fullName, products } = props.userInfo.data
  return (
    <div>
      <div>
        <p>{username}</p>
        <h3>Información de usuario</h3>
        <p>email: {email}</p>
        <p>Dirección:</p>
        <p>{address.street}</p>
        <p>{address.number}</p>
        <p>{address.city}</p>
        <p>{address.postalCode}</p>
      </div>
      <div>
        <h3>PRODUCTS</h3>

        {/* <p>{products[0].name}</p> */}
        {/* {products.map(product => (
          <div>
            <p>Producto: {product.name}</p>
            <p>Descripción: {product.description}</p>
            <p>Precio: {product.amount}</p>
            <p>Categoría: {product.category}</p>
            <p>Año de adquisición: {product.yearOfAcquisition}</p>
            <button>Borrar producto</button>
          </div>

        ))} */}
      </div>
    </div>
  );
}

export default UserInfo;