import React, { Component } from "react";
import "./App.css";
import Products from "./components/Products";
import Filter from "./components/Filter";

class App extends Component {
  constructor(props) {
    super(props);
    // Inicijalno stanje komponente
    this.state = {
      products: [], // Svi proizvodi
      filterProducts: [], // Filtrirani proizvodi
    };
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
  }

  componentDidMount() {
    // API endpoint za proizvode
    const api = "http://localhost:8000/products";
    // Fetch podataka i setovanje u stanje nakon preuzimanja
    fetch(api)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          products: data,
          filterProducts: data,
        })
      );
  }

  // Event handler za promenu sortiranja
  handleSortChange = (e) => {
    this.setState({
      sort: e.target.value,
    });
    this.listProducts();
  };

  // Event handler za promenu filtriranja
  handleSizeChange = (e) => {
    this.setState({
      size: e.target.value,
    });
    this.listProducts();
  };

  // Metoda za sortiranje proizvoda
  listProducts = () => {
    this.setState((stateObj) => {
      if (stateObj.sort !== "") {
        stateObj.products.sort((a, b) =>
          stateObj.sort === "lowestprice"
            ? a.price > b.price
              ? 1
              : -1
            : a.price < b.price
            ? 1
            : -1
        );
      } else {
        stateObj.products.sort((a, b) => (a.id > b.id ? 1 : -1));
      }

      // Filtriranje po velicini
      if (stateObj.size !== "") {
        return {
          filterProducts: stateObj.products.filter(
            (a) => a.availableSizes.indexOf(stateObj.size.toUpperCase()) !== -1
          ),
        };
      }

      // Defaultni povratak svih proizvoda
      return { filterProducts: this.state.products };
    });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>E-commerce</h1>
          <hr />
          <div className="row">
            <div className="col-md-9">
              {/* Filter komponenta za prikaz sortiranja/filtriranja */}
              <Filter
                count={this.state.filterProducts.length}
                handleSortC={this.handleSortChange}
                handleSizeC={this.handleSizeChange}
              />
              <hr />
              {/* Products komponenta za prikaz proizvoda */}
              <Products products={this.state.filterProducts} />
            </div>
            <div className="col-md-3">
              {/* Placeholder za korpu */}
              Basket goes here
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;