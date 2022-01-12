import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";

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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.singleProductReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleProduct: (id) => {
      dispatch(fetchSingleProduct(id));
    },
  };
};

const ConnectedSingleProduct = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct);
export default ConnectedSingleProduct;
