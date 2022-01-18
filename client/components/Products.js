import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/products";
import { Link } from "react-router-dom";
import styles from "./Products.modules.css";

const Products = () => {
  let products = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <div className={styles.products_container}>
        <h1> Hello from Products Page</h1>
        <div className={styles.products_items}>
          {products.map((product) => {
            return (
              <div key={product.id}>
                <Link to={`/home/${product.id}`}>
                  <div>{product.name}</div>
                  <img src={product.imageUrl} className={styles.products_img} />
                  <div>${product.price / 100}</div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
