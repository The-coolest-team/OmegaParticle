import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/products";

const Products = () => {
  let products = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <div>
        <h1> Hello from Products Page</h1>
        {products.map((product) => {
          return (
            <div key={product.id}>
              <div>{product.name}</div>
              <div>{product.price}</div>
              <img src={product.image_url} />
            </div>
          );
        })}
      </div>
      <div>{}</div>
    </div>
  );
};

export default Products;
