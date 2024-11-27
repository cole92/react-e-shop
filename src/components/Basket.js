import React, { useEffect } from "react";
import util from "../util";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../cartSlice";


const Cart = () => {
  // Hook za pokretanje Redux akcija
  const dispatch = useDispatch();
  // Pristup globalnom stanju korpe iz Redux `store`
  const cart = useSelector(state => state.cart)
  // Funkcija za uklanjanje proizvoda iz korpe
  // Prima proizvod (`product`) i boolean vrednost (`isRemoveAll`) koja odredjuje nacin uklanjanja
  const handleRemoveFromCart = (product, isRemoveAll) => {
    // Dispecuje akciju `removeFromCart` sa odgovarajucim podacima
    dispatch(removeFromCart({ product, isRemoveAll }));
  };

  return (
    <div className="alert alert-info">
      {/* Prikaz poruke ako je korpa prazna */}
      {cart.cartItems.length === 0 ? (
        "Basket is empty"
      ) : (
        <div> {" "}
          {/* Prikaz ukupnog broja proizvoda u korpi */}
          You have {cart.cartItems.length} items in basket. <hr />{" "}
        </div>
      )}

      {/* Mapiranje kroz proizvode u korpi */}
      {cart.cartItems.map((item) => (
        <div key={item.id} className="basket-item">
          {/* Prikaz naslova proizvoda i dugmeta za uklanjanje svih istih proizvoda */}
          <p>
            {item.title} {""}
            <button
              className="btn btn-danger btn-sm ml-2"
              onClick={() => handleRemoveFromCart(item, true)}
            >
              X
            </button>
          </p>
          {/* Prikaz trenutne kolicine proizvoda i dugmeta za smanjenje broja */}
          <p>
            Quantity: {item.cartQuantity} {""}
            <button
              className="btn btn-danger btn-sm ml-2"
              onClick={() => handleRemoveFromCart(item, false)}
            >
              -
            </button>
          </p>
          {/* Prikaz ukupne cene za datu stavku (kolicina x cena) */}
          <p>Price: {(item.price * item.cartQuantity).toFixed(2)}$</p> <hr />
        </div>
      ))}

      {/* Prikaz ukupne cene svih proizvoda u korpi */}
      <div>
        <strong>
          Todal: $
          {cart.cartItems
            .reduce((acc, item) => acc + item.price * item.cartQuantity, 0) // Sabiranje cena svih proizvoda
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
  )
};

export default Cart;