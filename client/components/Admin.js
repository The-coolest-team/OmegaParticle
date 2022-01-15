import React from "react";
import { connect } from "react-redux";
import AllProductsAdmin from "./AllProductsAdmin"
import {CreateProduct} from "./CreateProduct"

class Admin extends React.Component {
  constructor() {
    super();
  }



  render() {
    return (
      <div>
        <h1>Admin Page</h1>
        <div>
          <CreateProduct/>
      </div>
        <div>===================================================</div>
        <div>
      </div>
        <AllProductsAdmin />
      </div>
    )
  }
}

let mapState = (state) => {
  return {}
}

let mapDispatch = (dispatch) => {
  return {}
}

export default connect(mapState, mapDispatch)(Admin)
