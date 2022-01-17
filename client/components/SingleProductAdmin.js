import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { EditProductAdmin } from "./EditProductAdmin";
import { deletedProduct, updatedProduct } from "../store/products";

function SingleProductAdmin(props) {
  useEffect(() => {
    props.fetchSingleProduct(props.match.params.productId);
  }, []);

  return (
    <div>
      <EditProductAdmin {...props} />
      <div>
        <h1>
          <button
            type="submit"
            onClick={() => {
              props.deleteProduct(props.product.id);
            }}
          >
            DELETE
          </button>
        </h1>
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

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    fetchSingleProduct: (id) => {
      dispatch(fetchSingleProduct(id));
    },
    deleteProduct: (product) => dispatch(deletedProduct(product, history)),
    updateProduct: (product) => dispatch(updatedProduct(product, history)),
  };
};

const ConnectedSingleProductAdmin = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProductAdmin);
export default ConnectedSingleProductAdmin;
