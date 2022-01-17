import React from "react";
import { connect } from "react-redux";
import { createdProduct } from "../store/products";

export class CreateProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      stock: 0,
      price: 0,
      imageUrl: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log({...this.state})
    this.props.createProduct({...this.state});
    this.setState({
      name: "",
      description: "",
      stock: 0,
      price: 0,
      imageUrl: ""
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1> New Product Form</h1>
          <label>Name:</label>
          <input
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <br />
          <label>Description:</label>
          <input
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <br />
          <label>Stock:</label>
          <input
            name="stock"
            value={this.state.stock}
            onChange={this.handleChange}
          />
          <br />
          <label>Price:</label>
          <input
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
          <br />
          <label>Image:</label>
          <input
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />
          <button type="submit"> SUBMIT</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createProduct: (product) => dispatch(createdProduct(product, history)),
  };
};

export default connect(null, mapDispatchToProps)(CreateProduct);
