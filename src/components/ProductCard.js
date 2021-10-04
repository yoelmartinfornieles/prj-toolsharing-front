import {Image} from "cloudinary-react"

function ProductCard(props) {

  const {product} = props
  return (
    <div className="product-card">
        <a href={`/product/${product._id}`}>
          <div className="img-cropper">
            <Image
              className="img-cropper-img"
              cloudName="toolsharing"
              publicId={product.photo}
            />
          </div>
          <div className="card-text-container">
          <h3>{product.name}</h3>
          <p>{product.amount} €/day</p>
          </div>
        </a>
      </div>
  );
}

export default ProductCard;
