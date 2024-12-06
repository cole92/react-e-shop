import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, addtoCart, clearCart } from "../cartSlice";
import { Link } from "react-router-dom";


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
  // Metoda koriscena za pojedinacno dodavanje vec postojeceg itema u korpi
  const handleAddToCart = (product) => {
    dispatch(addtoCart(product));
  };
  // Metoda za brisanje svih stavki iz korpe
  const clearAllFromCart = () => {
    dispatch(clearCart())
  }

  return (
    <div className="container my-4 p-3 border border-primary rounded bg-light shadow">
      {/* Naslov korpe */}
      <h4 className="text-center text-primary mb-4">Shopping Cart</h4>

      {/* Poruka ako je korpa prazna */}
      {cart.cartItems.length === 0 ? (
        <div className="alert alert-warning text-center">
          Your basket is empty.
        </div>
      ) : (
        <div className="mb-3 text-center">
          {/* Ukupan broj proizvoda u korpi */}
          <h5 className="text-success">
            You have {cart.cartItems.length} item(s) in your basket.
          </h5>
        </div>
      )}

      {/* Lista proizvoda u korpi */}
      {cart.cartItems.map((item) => (
        <div key={item.id} className="card mb-3 shadow-sm">
          <div className="row g-0 align-items-center">
            {/* Sekcija za sliku proizvoda */}
            <div className="col-md-4 p-2">
              <img
                src={`/products/${item.sku}_2.jpg`}
                className="img-fluid rounded"
                alt={item.title}
              />
            </div>
            {/* Sekcija za detalje o proizvodu */}
            <div className="col-md-8">
              <div className="card-body">
                {/* Naslov proizvoda */}
                <h5 className="card-title">{item.title}</h5>
                {/* Kontrole za kolicinu */}
                <p className="card-text">
                  {/* Dugme za smanjenje kolicine */}
                  <button
                    className="btn btn-sm btn-outline-danger me-2"
                    onClick={() => handleRemoveFromCart(item, false)}
                  >
                    -
                  </button>
                  {/* Prikaz trenutne kolicine */}
                  <strong>Quantity:</strong> {item.cartQuantity}
                  {/* Dugme za povecanje kolicine */}
                  <button
                    className="btn btn-sm btn-outline-success ms-2"
                    onClick={() => handleAddToCart(item)}
                  >
                    +
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

      {/* Sekcija za ukupnu cenu i kontrole korpe */}
      {cart.cartItems.length > 0 && (
        <div className="border-top pt-3 mt-3 d-flex justify-content-between align-items-center">
          {/* Dugme za brisanje svih stavki */}
          <button
            className="btn btn-danger mt-2"
            onClick={() => clearAllFromCart()}
          >
            Clear All
          </button>
          {/* Ukupna cena proizvoda */}
          <h5 className="text-primary mb-0">
            Total: $
            {cart.cartItems
              .reduce((acc, item) => acc + item.price * item.cartQuantity, 0)
              .toFixed(2)}
          </h5>
          {/* Dugme za Checkout */}
          <div className="d-flex flex-column align-items-end">
            <button
              className="btn btn-success mt-2"
              onClick={() => console.log("Checkout clicked!")}
            >
              Checkout
            </button>
            {/* Link za povratak na pocetnu stranu */}
            <Link to="/" className="text-muted mt-2">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;