import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sizeBy, sortBy, filterBy, sizeP, sortP } from "../productSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const { list, filteredProducts } = useSelector(state => state.products);

  const handleSortChange = e => {
    dispatch(sortBy(e.target.value))
    listProducts();
  }
  let s = [...list]

  const listProducts = () => {
    if (sortP !== '') {
      dispatch(filterBy(s));
    }

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
                onChange={ e => handleSortChange(e)} // Event handler za promenu sortiranja
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
                onChange={ e => handleSizeChange(e)} //Event handler za promenu filtriranja
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
