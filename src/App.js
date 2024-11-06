import React, {Component} from 'react';
import './App.css';
import Products from './components/Products';
import Filter from './components/Filter';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      filterProducts: []
    };
  };

  componentDidMount() {
    const api = 'http://localhost:8000/products';
    fetch(api)
    .then(response => response.json())
    .then(data => this.setState(
      {
        products: data,
        filterProducts: data
      }))
  };

  handleSortChange = e => {
    this.setState({
      sort: e.target.value
    });
    this.listProducts();
  };

  listProducts = () => {

  };

  render() {
    return (
      <div className='App'>
        <div className='container'>
          <h1>E comerce</h1>
          <hr/>
          <div className='row'>
            <div className='col-md-9'>
              <Filter count={this.state.filterProducts.length} handleSortC={this.handleSortChange}/>
              <hr/>
              <Products products={this.state.products}/>
            </div>
            <div className='col-md-3'>
              Korpa ide ovde
            </div>
          </div>
        </div>
      </div>
    );
  };
};


export default App;
