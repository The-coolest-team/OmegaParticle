import React from "react";

export class EditProductAdmin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      stock: 0,
      price: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product.id !== this.props.product.id) {
      this.setState({
        name: this.props.product.name,
        description: this.props.product.description,
        stock: this.props.product.stock,
        price: this.props.product.price,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateProduct({ ...this.props.product, ...this.state });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <h1>UPDATE THIS PRODUCT</h1>
        <form onSubmit={this.handleSubmit}>
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
          <label>Price:</label>
          <input
            name="price"
            value={this.state.price}
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
          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}

export default EditProductAdmin;
