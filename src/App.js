import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProductList from './component/ProductList';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>React Products App</h1>
        <p>A simple React app for managing products.</p>
      </header> */}

      {/* Main content to display the product list */}
      {/* <Routes>
        <Route path="/" element={<ProductList />} />
      </Routes> */}
      <main>
        <ProductList />
      </main>
    </div>
  );
}

export default App;
