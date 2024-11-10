import React, { Component } from 'react'

class Basket extends Component {
    render() {
        const { cartItems } = this.props;
        return (
            <div className='alert alert-info'>
                { cartItems.length === 0 ? 'Basket is empty' :
                    <div> You have {cartItems.length} items in basket. <hr /> </div>
                }
            </div>
        )
    }
}

export default Basket;