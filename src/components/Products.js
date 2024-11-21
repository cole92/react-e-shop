import React, { Component } from "react";
import util from "../util";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAsync } from "../productSlice";


const Products = () => {
  return (
    <div
      key={product.id}
      className="col-md-3 my-2 mx-4 p-2 border border-primary border-2 rounded"
    >
      <div className="thumbnail text-center">
        <a href={`#${}`}>
          {/* Prikaz slike proizvoda */}
          <img src={`/products/${}_2.jpg`} alt={} />
          {/* Prikaz naziva proizvoda */}
          <div>{product.title}</div>
        </a>
        <div>
          {/* Prikaz formatirane cene proizvoda */}
          <strong>{util.formatCurrency()}</strong> <br />
          <button
            className="btn btn-primary"

            onClick={() => this.props.handleAddToCart()} // Prosledjena metoda
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
