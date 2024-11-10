import React, { Component } from "react";
import "./App.css";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Basket from "./components/Basket"

class App extends Component {
  constructor(props) {
    super(props);
    // Inicijalno stanje komponente
    this.state = {
      products: [], // Svi proizvodi
      filterProducts: [], // Filtrirani proizvodi
      size: '', // Pocetne vrednosti
      sort: '', // Pocetne vrednosti
      cartItems: JSON.parse(localStorage.getItem('cartItems')) || [] // Korpa
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
      // Sortiranje po ceni
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
      if (stateObj.size && stateObj.size !== "") {
        return {
          filterProducts: stateObj.products.filter((a) =>
            a.availableSizes.indexOf(stateObj.size.toUpperCase()) >= 0 // Provera da li postoji
          ),
        };
      }

      // Ako nema filtera, vracamo sve proizvode
      return { filterProducts: this.state.products };
    });
  };

  handleAddToCart = product => {
    this.setState((stateObj) => {
      const cartItems = [...stateObj.cartItems]; // Kopija trenutne korpe

      //Provera da li item vec postoji u korpi
      const existingProduct = cartItems.find((item) => item.id === product.id);

      if (existingProduct) {
        // Ako postoji, povecavamo broj
        existingProduct.count += 1;
      } else {
        // Ako ne postoji dodajemo ga u korpu sa pocetnim brojem 1
        cartItems.push({...product, count: 1});
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Azuriranje storage

      return { cartItems }; // Vracanje novog niza
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
              <Products products={this.state.filterProducts} handleAddToCart={this.handleAddToCart}/>
            </div>
            <div className="col-md-3">
              {/* Placeholder za korpu */}
              <Basket cartItems={this.state.cartItems} /> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;