import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getProducts } from "../store/products";

export const Products = (props) => {
  let productList = [];
  useEffect(() => {
    let productList = props.getProducts();
  }, []);

  return (
    <div>
      <h1> Hello from Products Page</h1>
      <div>
        {/* {productList.map((product) => {
          return <div>{product}</div>;
        })} */}
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch, history) => {
  return {
    getProducts: () => dispatch(getProducts()),
  };
};

export default connect(mapState, mapDispatch)(Products);
