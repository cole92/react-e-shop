import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../cartSlice";


const Cart = () => {
  // Hook za pokretanje Redux akcija
  const dispatch = useDispatch();
  // Pristup globalnom stanju korpe iz Redux `store` sa fallback-om
  const cart = useSelector(state => state.cart) || { cartItems: [] };
  // Funkcija za uklanjanje proizvoda iz korpe
  // Prima proizvod (`product`) i boolean vrednost (`isRemoveAll`) koja odredjuje nacin uklanjanja
  const handleRemoveFromCart = (product, isRemoveAll) => {
    // Dispecuje akciju `removeFromCart` sa odgovarajucim podacima
    dispatch(removeFromCart({ product, isRemoveAll }));
  };

  return (
    <div className="container my-4 p-3 border border-primary rounded bg-light shadow">
      {/* Naslov korpe */}
      <h4 className="text-center text-primary mb-4">Shopping Cart</h4>
  
      {/* Prikaz poruke ako je korpa prazna */}
      {cart.cartItems.length === 0 ? (
        <div className="alert alert-warning text-center">
          Your basket is empty.
        </div>
      ) : (
        <div className="mb-3 text-center">
          {/* Prikaz ukupnog broja proizvoda u korpi */}
          <h5 className="text-success">
            You have {cart.cartItems.length} item(s) in your basket.
          </h5>
        </div>
      )}
  
      {/* Mapiranje kroz proizvode u korpi */}
      {cart.cartItems.map((item) => (
        <div key={item.id} className="card mb-3 shadow-sm">
          <div className="row g-0 align-items-center">
            <div className="col-md-4 p-2">
              {/* Placeholder za sliku proizvoda */}
              <img
                src={`/products/${item.sku}_2.jpg`}
                className="img-fluid rounded"
                alt={item.title}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                {/* Naslov proizvoda */}
                <h5 className="card-title">{item.title}</h5>
                {/* Kolicina proizvoda */}
                <p className="card-text">
                  <strong>Quantity:</strong> {item.cartQuantity}
                  <button
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={() => handleRemoveFromCart(item, false)}
                  >
                    -
                  </button>
                </p>
                {/* Cena proizvoda */}
                <p className="card-text">
                  <strong>Price:</strong> ${(item.price * item.cartQuantity).toFixed(2)}
                </p>
                {/* Dugme za uklanjanje svih instanci proizvoda */}
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleRemoveFromCart(item, true)}
                >
                  Remove All
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
  
      {/* Ukupna cena proizvoda */}
      {cart.cartItems.length > 0 && (
        <div className="border-top pt-3 mt-3 text-end">
          <h5 className="text-primary">
            Total: $
            {cart.cartItems
              .reduce((acc, item) => acc + item.price * item.cartQuantity, 0)
              .toFixed(2)}
          </h5>
          {/* Dugme za Checkout akciju */}
          <button
            className="btn btn-success mt-2"
            onClick={() => console.log("Checkout clicked!")}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;