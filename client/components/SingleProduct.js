import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { addSingleProduct } from "../store/cart";

const SingleProduct = (props) => {
  useEffect(() => {
    props.fetchSingleProduct(props.match.params.productId);
  }, []);

  return (
    <div>
      <img src={props.product.image_url}></img>
      <p>{props.product.name}</p>
      <p>{props.product.price}</p>
      <p>{props.product.description}</p>
      <button
        onClick={() => {
          console.log(props);
        }}
      >
        {" "}
        Add to cart
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.singleProductReducer,
    userId: state.auth.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleProduct: (id) => {
      dispatch(fetchSingleProduct(id));
    },
    addToCart: (id) => {
      dispatch(addSingleProduct(id))
    }
  };
};

const ConnectedSingleProduct = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct);
export default ConnectedSingleProduct;
