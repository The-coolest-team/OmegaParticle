import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
// import { updateCart } from "../store"
import { Link } from "react-router-dom";
import styles from "./SingleProduct.modules.css";

const SingleProduct = (props) => {
  useEffect(() => {
    props.fetchSingleProduct(props.match.params.productId);
  }, []);

  const { id, name, description, price, imageUrl } = props.product;

  return (
    <div className={styles.single_product_container}>
      <div className={styles.img_and_button_container}>
        <img className={styles.single_product_img} src={imageUrl}></img>
        <p>${price / 100}</p>

        <Link to={"/added"}>
          <button
            className={styles.add_to_cart_button}
            onClick={() => {
              addToCart(id, name, description, price, imageUrl);
              // props.updateCart(userId)
            }}
          >
            Add to cart
          </button>
        </Link>
      </div>
      <div className={styles.text_container}>
        <div className={styles.single_product_name}>{name}</div>
        <p>Description:</p>
        <p className={styles.single_product_description}>{description}</p>
      </div>
      <div className={styles.color_bar}></div>
    </div>
  );
};

const addToCart = (productId, name, description, price, imageUrl) => {
  let localCartArr = [];
  const localCart = window.localStorage.getItem("cart");
  if (localCart) localCartArr = JSON.parse(localCart);

  let newItem = true;
  localCartArr.forEach((cartitem) => {
    if (cartitem.productId === productId) {
      cartitem.quantity++;
      newItem = false;
    }
  });
  if (newItem)
    localCartArr.push({
      productId,
      name,
      description,
      price,
      quantity: 1,
      imageUrl,
    });
  window.localStorage.setItem("cart", JSON.stringify(localCartArr));
};

const mapStateToProps = (state) => {
  return {
    product: state.singleProductReducer,
    // userId: state.auth.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleProduct: (id) => {
      dispatch(fetchSingleProduct(id));
    },
    // updateCart: (userId) => {
    // dispatch(updateCart(userId))
    // }
  };
};

const ConnectedSingleProduct = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct);

export default ConnectedSingleProduct;
