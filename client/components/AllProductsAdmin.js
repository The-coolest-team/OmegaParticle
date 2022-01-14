import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

import { getProducts } from "../store/products";

function AllProductsAdmin({allProducts}) {
  return allProducts.length ? (
    <div>
      {
        allProducts.map((product) => {
          return (
            <div key={product.id}>
              <Link to={`/home/${product.id}`}>
                <img src={product.imageUrl} style={{width: '300px'}} />
                <div>{product.name}</div>
                <div>{product.price}</div>
              </Link>
            </div>
          );
        })
      }
    </div>
  ) : (<h3> Loading... </h3>)
}

let mapState = (state) => {
  return {
    allProducts: state.products
  }
}

let mapDispatch = (dispatch) => {
  return {
    getProducts: () => {dispatch(getProducts())}
  }
}

export default connect(mapState, mapDispatch)(AllProductsAdmin)

