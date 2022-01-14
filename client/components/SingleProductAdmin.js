import React from 'react'

function SingleProductAdmin() {
  useEffect(() => {
    props.fetchSingleProduct(props.match.params.productId);
  }, []);

  return (
    <div>
      <div onClick={() => {deleteProduct(props.match.params.productId)}}><h1>X</h1></div>
      <img src={props.product.imageUrl}></img>
      <p>{props.product.name}</p>
      <p>{props.product.price}</p>
      <p>{props.product.description}</p>
    </div>
  );
}

export default SingleProductAdmin
