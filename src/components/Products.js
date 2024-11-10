import React, { Component } from "react";
import util from "../util";

export default class Products extends Component {
  render() {
    // Mapiranje kroz proizvode kako bi se svaki prikazao kao pojedinacni element
    const productItems = this.props.products.map((product) => {
      return (
        <div
          key={product.id}
          className="col-md-3 my-2 mx-4 p-2 border border-primary border-2 rounded"
        >
          <div className="thumbnail text-center">
            <a href={`#${product.id}`}>
              {/* Prikaz slike proizvoda */}
              <img src={`/products/${product.sku}_2.jpg`} alt={product.title} />
              {/* Prikaz naziva proizvoda */}
              <div>{product.title}</div>
            </a>
            <div>
              {/* Prikaz formatirane cene proizvoda */}
              <strong>{util.formatCurrency(product.price)}</strong> <br />
              <button className="btn btn-primary" onClick={() => this.props.handleAddToCart(product)}>Add to cart</button>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="row">
        {/* Prikaz svih proizvoda */}
        {productItems}
      </div>
    );
  }
}
