// src/components/ProductList.js
import React from 'react';
import Product from './Product'; // Import Product component

const ProductList = ({ products, addToCart }) => (
  <div className="listProduct">
    {products.map((product, index) => (
      <Product key={index} product={product} addToCart={addToCart} />
    ))}
  </div>
);

export default ProductList;
