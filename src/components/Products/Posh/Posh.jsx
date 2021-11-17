import React from 'react';
import './Posh.css';

const Posh = ({ posh, handleAddToCart }) => {
  return (
    <main>
      <div className="container">
        <ul className="thumb">
          <li>
            <img src={posh.image.url} alt={posh.name} />
          </li>
          <li>
            <img src={posh.image.url} alt={posh.name} />
          </li>
          <li>
            <img src={posh.image.url} alt={posh.name} />
          </li>
        </ul>
        <div className="imgBox">
          <h2>{posh.name}</h2>
          <img src={posh.image.url} alt={posh.name} />
          <span className="price">{posh.price.formatted_with_symbol}</span>
          <button onClick={() => handleAddToCart(posh.id, 1 )} className="cart_btn">
            Add To Cart
          </button>
        </div>
      </div>
    </main>
  );
};

export default Posh;
