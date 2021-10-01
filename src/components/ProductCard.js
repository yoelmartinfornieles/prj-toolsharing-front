function ProductCard(props) {
  return (
    <div className="product-card">
      <a href={props.link}>
        <div className="img-cropper">
          <img src={props.img} />
        </div>
        <p>{props.name}</p>
        <p>{props.amount} €/day</p>
      </a>
    </div>
  );
}

export default ProductCard;
