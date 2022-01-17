import React from "react";
import { connect } from "react-redux";
import AllProductsAdmin from "./AllProductsAdmin";
import { CreateProduct } from "./CreateProduct";
import { createdProduct } from "../store/products";
import { fetchUsers } from "../store/users";
import AdminUser from "./AdminUser"

class Admin extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div>
        <h1>Admin Page</h1>
        <AdminUser />
        <div>
          <div>===================================================</div>
          <CreateProduct {...this.props} />
        </div>
        <div>===================================================</div>
        <div></div>
        <AllProductsAdmin />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createProduct: (product) => dispatch(createdProduct(product, history)),
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(null, mapDispatchToProps)(Admin);
