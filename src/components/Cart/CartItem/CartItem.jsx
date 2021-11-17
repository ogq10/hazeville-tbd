import React from 'react';
import './CartItem.css';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const handleUpdateCartQty = (lineItemId, newQuantity) => onUpdateCartQty(lineItemId, newQuantity);
  

  const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);

  return (
    <div class="bag">
      <img
        className="rope"
        src="https://res.cloudinary.com/drbpdytwx/image/upload/v1636448765/rope-removebg-preview_rem331.png"
        alt="rope"
      />
      <p class="card-price">
        <span className="thespan">{item.name}</span> <br />{' '}
        {item.line_total.formatted_with_symbol}
      </p>
      <img className="cart_image" src={item.image.url} alt={item.name} />
      <span className="line-through"></span>

      <div className="value-button">
        <button
          className="decrease"
          type="button"
          onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}
        >
          -
        </button>
        <div className="number">{item.quantity}</div>
        <button
          className="increase"
          type="button"
          onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
        >
          +
        </button>

        <button
          className="remove_btn"
          type="button"
          color="secondary"
          onClick={() => handleRemoveFromCart(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
