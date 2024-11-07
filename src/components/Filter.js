import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-9">
          <div className="row">
            {/* Prikaz broja pronadjenih proizvoda */}
            <div className="col-md-4">{this.props.count} products found</div>
            <div className="col-md-4">
              <label>
                {/* Padajuci meni za sortiranje proizvoda */}
                Order by
                <select
                  className="form-control"
                  onChange={this.props.handleSortC} // Event handler za promenu sortiranja
                >
                  <option value="">Select</option>
                  <option value="lowestprice">Lowest to highest</option>
                  <option value="highestprice">Highest to lowest</option>
                </select>
              </label>
            </div>
            <div className="col-md-4">
              <label>
                {" "}
                {/* Padajuci meni za filtriranje proizvoda po velicini */}
                Filter Size
                <select className="form-control">
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
    );
  }
}
