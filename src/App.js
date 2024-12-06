import React from "react";
import "./App.css";
import Products from "./components/Products";
import Basket from "./components/Basket";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  return (
    <div className="App">
      <div className="container">
        {/* Naslov aplikacije */}
        <h1>E-commerce</h1>
        <hr />
        <div className="row">
          {/* Omotavanje aplikacije sa BrowserRouter za podrsku rutiranju */}
          <BrowserRouter>
            <Routes>
              {/* Glavna ruta koja obuhvata navigaciju */}
              <Route path="/" element={<NavBar />}>
                {/* Osnovna stranica sa proizvodima */}
                <Route index element={<Products />} />
                {/* Stranica za korpu */}
                <Route path="basket/" element={<Basket />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};

export default App;
