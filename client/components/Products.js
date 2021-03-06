import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store";
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
      <div>
        <div className={styles.products_parent}>
          {products.map((product) => {
            return (
              <Link
                to={`/home/${product.id}`}
                key={product.id}
                className={styles.products_card}
              >
                <div>{product.name}</div>
                <img
                  src={product.imageUrl}
                  className={styles.products_visual}
                />
                <div>
                  <button className={styles.products_button}>
                    Additional Info
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
