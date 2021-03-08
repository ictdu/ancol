import React, { Fragment } from 'react';
import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css'
import { Button, Card, Container, Grid, Icon, Image, Menu, Segment } from 'semantic-ui-react';
import { ProductCard } from './features/seller/product/ProductCard';
import { LoginPage } from './features/LoginPage';

function App() {
  return (
    <LoginPage />
  );
}

export default App;
