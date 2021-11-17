import React from 'react';
import { Grid } from '@material-ui/core';
import CartItem from './CartItem/CartItem';
import './Cart.css';

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  // const handleEmptyCart = () => onEmptyCart();

  // const renderEmptyCart = () => (
  //   <div className="title">
  //     You have no items in your shopping cart,
  //     {/* <Link to="/categories">start adding some</Link>! */}
  //   </div>
  // );



  // if (!cart.line_items) return 'Loading';

  return (
    // {!cart.line_items.length ? renderEmptyCart() : renderCart()}
    <>
    
      <i class="gg-arrow-long-right">
        <span className="check">Checkout</span>
      </i>
      <Grid
        container
        direction="row"
        style={{ marginTop: '-30px', marginLeft: '-40px' }}
      >
        
        {cart.line_items.map((lineItem) => (
          <Grid item lg={4} md={4} sm={12} xs={12} key={lineItem.id}>
            <CartItem
              item={lineItem}
              onUpdateCartQty={onUpdateCartQty}
              onRemoveFromCart={onRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>

      {/* <div>
        <div variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</div>
        <div>
          <button
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty cart
          </button>
          <Button
            component={Link}
            to="/checkout"
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div> */}
    </>
  );
};

export default Cart;
