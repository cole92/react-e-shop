import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sizeBy, sortBy, filterBy, sizeP, sortP } from "../productSlice";

const Filter = () => {
  // Hook za pokretanje akcija iz Redux-a
  const dispatch = useDispatch();
  // Pristup globalnom stanju `products` iz Redux store-a i destrukturiranje `list` i `filteredProducts`
  const { list, filteredProducts } = useSelector(state => state.products);

  // Funkcija za promenu sortiranja (triggeruje sortBy akciju iz Redux-a)
  const handleSortChange = e => {
    dispatch(sortBy(e.target.value))
    listProducts();
  }
  // Pravljenje kopije originalne liste proizvoda (state.list) radi manipulacije bez menjanja originala
  let s = [...list]
  // Funkcija za promenu velicine (triggeruje sizeBy akciju iz Redux-a)
  const handleSizeChange = e => {
    dispatch(sizeBy(e.target.value))
    listProducts();
  }
  // Funkcija za azuriranje liste proizvoda na osnovu trenutnih filtera i sortiranja
  const listProducts = () => {
    if (sortP !== '') {
      // Ako postoji aktivno sortiranje, azuriramo filtriranu listu sa kopijom originalnog niza
      dispatch(filterBy(s));
    }
    if (sizeP !== '') {
      // Ako postoji aktivni filter velicine, azuriramo filtriranu listu sa kopijom originalnog niza
      dispatch(filterBy(s))
    }
    // Ako nema aktivnog sortiranja ili filtriranja, vracamo originalnu listu proizvoda
    dispatch(filterBy(list))
  }

  return (
    <div className="row">
      <div className="col-md-9">
        <div className="row">
          {/* Prikaz broja pronadjenih proizvoda */}
          <div className="col-md-4">products found</div>
          <div className="col-md-4">
            <label>
              {/* Padajuci meni za sortiranje proizvoda */}
              Order by
              <select
                className="form-control"
                value={sortP}
                onChange={e => handleSortChange(e)} // Event handler za promenu sortiranja
              >
                <option value="">Select</option>
                <option value="lowestprice">Lowest to highest</option>
                <option value="highestprice">Highest to lowest</option>
              </select>
            </label>
          </div>
          <div className="col-md-4">
            <label> {" "}
              {/* Padajuci meni za filtriranje proizvoda po velicini */}
              Filter Size
              <select
                className="form-control"
                value={sizeP}
                onChange={e => handleSizeChange(e)} //Event handler za promenu filtriranja
              >
                <option value="">ALL</option>
                <option value="xs">XS</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Filter;
