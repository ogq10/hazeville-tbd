import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Poshes, Cart, Checkout, Categories } from './components';
import { commerce } from './lib/commerce';
import './App.css';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
  const [poshList, setPoshList] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    console.log('the product data', data);
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    commerce.products
      .list({ category_slug: ['posh'] })
      .then((response) => setPoshList(response.data));
  }, []);

  console.log('the cart', cart);
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        
        <CssBaseline />
        <Navbar cart={cart} />
        <Switch>
          <Route exact path="/categories/posh">
            <Poshes
              poshList={poshList}
              handleAddToCart={handleAddToCart}
              handleUpdateCartQty
            />
          </Route>

          <Route exact path="/categories">
            <Categories handleEmptyCart={handleEmptyCart} />
          </Route>

          <Route exact path="/cart">
            <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
          </Route>
          {/* <PrivateRoute
            path={`/checkout/:id`}
            component={Checkout}
            cart={cart}
            order={order}
            onCaptureCheckout={handleCaptureCheckout}
            error={errorMessage}
          /> */}

          
        </Switch>
      </div>
    </Router>
  );
};

export default App;
