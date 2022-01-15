import React, { useEffect, useState } from "react";
import {connect} from "react-redux"
import { fetchSingleProduct } from "../store/singleProduct";
import {EditProductAdmin} from "./EditProductAdmin"

function SingleProductAdmin(props) {
  useEffect(() => {
    props.fetchSingleProduct(props.match.params.productId);
  }, []);

  return (
    <div>
      <EditProductAdmin {...props} />
      <div>
        <h1><button>DELETE</button></h1>
      </div>
      <img src={props.product.imageUrl}></img>
      <p>{props.product.name}</p>
      <p>{props.product.price}</p>
      <p>{props.product.description}</p>
    </div>
  );
}

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

const ConnectedSingleProductAdmin = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProductAdmin);
export default ConnectedSingleProductAdmin;

