import React from "react";
import { connect } from "react-redux";
import AllProductsAdmin from "./AllProductsAdmin"

class Admin extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>Admin Page</h1>
        <div>===================================================</div>
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
