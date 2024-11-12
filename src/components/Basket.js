import React, { Component } from "react";

class Basket extends Component {
  render() {
    // Destrukturiranje props-a za pristup korpi proizvoda
    const { cartItems } = this.props;

    return (
      <div className="alert alert-info">
        {/* Prikaz poruke ako je korpa prazna */}
        {cartItems.length === 0 ? (
          "Basket is empty"
        ) : (
          <div> {" "}
           {/* Prikaz ukupnog broja proizvoda u korpi */}
            You have {cartItems.length} items in basket. <hr />{" "}
          </div>
        )}

         {/* Mapiranje kroz proizvode u korpi */}
        {cartItems.map((item) => (
          <div key={item.id} className="basket-item">
            {/* Prikaz naslova proizvoda i dugmeta za uklanjanje svih istih proizvoda */}
            <p>
              {item.title} {""}
              <button
                className="btn btn-danger btn-sm ml-2"
                onClick={() => this.props.handleRemoveFromCart(item, true)}
              >
                X
              </button>
            </p>
            {/* Prikaz trenutne kolicine proizvoda i dugmeta za smanjenje broja */}
            <p>
              Quantity: {item.count} {""}
              <button
                className="btn btn-danger btn-sm ml-2"
                onClick={() => this.props.handleRemoveFromCart(item, false)}
              >
                -
              </button>
            </p>
            {/* Prikaz ukupne cene za datu stavku (kolicina x cena) */}
            <p>Price: {(item.price * item.count).toFixed(2)}$</p> <hr />
          </div>
        ))}

        {/* Prikaz ukupne cene svih proizvoda u korpi */}
        <div>
          <strong>
            Todal: $
            {cartItems
              .reduce((acc, item) => acc + item.price * item.count, 0) // Sabiranje cena svih proizvoda
              .toFixed(2)}
          </strong>
        </div>
        {/* Dugme za Checkout akciju */}
        <button
          className="btn btn-success"
          onClick={() => console.log("Checkout clicked!")}
        >
          Checkout
        </button>
      </div>
    );
  }
}

export default Basket;
