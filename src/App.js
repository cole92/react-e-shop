import React, {Component} from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='container'>
          <h1>E comerce</h1>
          <hr/>
          <div className='row'>
            <div className='col-md-9'>
              Filter goes here
              <hr/>
              Products goes here
            </div>
            <div className='col-md-3'>
              Basket goes here
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
