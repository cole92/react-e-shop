import React, { useEffect } from "react";
import util from "../util";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAsync } from "../productSlice";
import { addtoCart } from "../cartSlice";


const Products = () => {
  const dispatch = useDispatch(); // Hook za pokretanje akcija iz Redux-a
  const { list, loading } = useSelector(state => state.products); // Pristup globalnom stanju iz `store`

  // Koristimo useEffect za API poziv prilikom inicijalnog renderovanja
  useEffect(() => {
    dispatch(getProductsAsync()); // Dispecujemo asinhronu akciju za preuzimanje proizvoda
  }, [dispatch]) // Zavisnost osigurava da se efekat pokrece samo jednom (ili ako se dispatch promeni)

  // Funkcija za dodavanje proizvoda u korpu
  const handleAddToCart = x => {
    dispatch(addtoCart(x))  // Pokrecemo Redux akciju `addToCart` sa podacima o proizvodu
  };

  // Ako je status `loading`, prikazujemo poruku dok se podaci ucitavaju
  if (loading) return <p>loading...</p>

  return (
    <div>
      <div className="row">
        {/** Mapiranje niza list **/}
        {list.map(product => (
          <div
          key={product.id}
          className="col-md-3 my-2 mx-4 p-2 border border-primary border-2 rounded"
        >
          <div className="thumbnail text-center">
            <a href={`#${product.id}`}>
              {/* Prikaz slike proizvoda */}
              <img src={`/products/${product.sku}_2.jpg`} alt={product.title} />
              {/* Prikaz naziva proizvoda */}
              <div>{ product.title }</div>
            </a>
            <div>
              {/* Prikaz formatirane cene proizvoda */}
              <strong>{util.formatCurrency(product.price)}</strong> <br />
              <button
                className="btn btn-primary"
    
                onClick={()=> handleAddToCart(product)} // Prosledjena metoda
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
