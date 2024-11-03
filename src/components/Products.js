import React, { Component } from 'react'

export default class Products extends Component {
  render() {
    const productItems = this.props.products.map(product => {
      return (

        <div className='col-md-4'>
          <div className='thumbnail text-center'>
            <a href={`#${product.id}`}>
              <img src={`/products/${product.sku}_2.jpg`} alt={product.title} />
              <div>
                {product.title}
              </div>
            </a>
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
