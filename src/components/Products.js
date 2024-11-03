import React, { Component } from 'react'

export default class Products extends Component {
  render() {
    const productItems = this.props.products.map(product => {
      return (

        <div className='col-md-3 my-2 mx-4 p-2 border border-primary border-2 rounded'>
          <div className='thumbnail text-center'>
            <a href={`#${product.id}`}>
              <img src={`/products/${product.sku}_2.jpg`} alt={product.title} />
              <div>
                {product.title}
              </div>
            </a>
            <div>
              <strong>Price: {product.price}</strong> <br/>
              <button className='btn btn-primary'>Add to cart</button>
            </div>
          </div>
        </div>
      )
    });
    return (
      <div className='row'>
        {productItems}
      </div>
    )
  }
}
