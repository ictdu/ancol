import React, { Fragment } from 'react';
import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css'
import { ProductCard } from './features/seller/product/ProductCard';
import LoginPage from './features/user/LoginPage';
import { SellerPage } from './features/seller/SellerPage';

function App() {
  return (
    <SellerPage />
  );
}

export default App;
