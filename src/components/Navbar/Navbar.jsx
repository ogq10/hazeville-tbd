import React, { useState } from 'react';
import { MdClose, MdMenu } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ShoppingCart } from '@material-ui/icons';
import { Badge, IconButton } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const NavMenuStyles = styled.div`


    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem 0;
    background: transparent;   
    ul{
        max-width: 1200px;
        margin: 0 auto;
        width: 90%;
        text-align: center;
        text-decoration: none;
    }
    .active{
        color: #FFE4D1;
    }
    li{
        display: inline-block;
        border-radius: 8px;
        transition: .3s ease background-color;
        &:hover{
            transform: scale(1.3);
            transition: .3s ease;
        }
        text-decoration: none;
    }
    a{
        display: inline-block;
        font-family: 'Montserrat', sans-serif;
        padding: 2rem 2rem; 
        font-size: 1rem;
        color: #f8f8ff;      
        outline: none;
        text-decoration: none;

    }
    i{
      margin: 4px;
      color: #fff;
    }
    .checkout_text{
      color: #fff;
    }
    
}
.mobile-menu-icon{
    position: absolute;
    right: 1rem;
    top: 1rem;
    cursor: pointer;
    outline: none; 
    padding: 1.2rem 2rem;
    font-size: 35px;
    color: #f8f8ff;
    display: none;
    
    *{
        pointer-events: none;
    }
}
.closeNavIcon{
    display: none;
    color: white;
}
@media only screen and (max-width: 768px){
    padding: 0;
    .hide-item{
        transform: translateY(calc(-100% - 1rem))
    }
    .mobile-menu-icon{
        display: block;
        margin: 8px;
    }
    .navItems{
        transition: .3s ease transform;
        background-color: rgba(0 ,0,0,0.5);
        backdrop-filter: blur(111px);
        padding: 1rem;
        width: 90%;
        
        max-width: 300px;
        border-radius: 10px;
        position: absolute;
        right: 2rem;
        top: 1rem;
        .closeNavIcon{
            
            color: #222831;
            display: block;
            padding: .5rem 1rem;
            font-size: 24px;
            margin: 0 0 0 auto; 
            cursor: pointer;
            *{
                pointer-events: none;
            }
        }
        li{
            display: block;
        }
    }
    
}
`;
const Navbar = ({ cart, totalItems}) => {
  
  let history = useHistory();

  const goToCheckout = (e) => {
    history.push(`/checkout/${cart.id}`)
    localStorage.setItem('cart-id', cart.id)
  }

  const [showNav, setShowNav] = useState(false);

  const location = useLocation();

  
 console.log('TTOTAL ITEMS', totalItems)
  return (
    <NavMenuStyles>
      <div
        className="mobile-menu-icon"
        onClick={() => setShowNav(!showNav)}
        role="button"
        onKeyDown={() => setShowNav(!showNav)}
        tabIndex={0}
      >
        <MdMenu />
      </div>

      <ul className={!showNav ? 'navItems hide-item' : 'navItems'}>
        <div
          className="closeNavIcon"
          onClick={() => setShowNav(!showNav)}
          role="button"
          onKeyDown={() => setShowNav(!showNav)}
          tabIndex={0}
        >
          <MdClose />
        </div>

        <li>
          <NavLink
            exact
            to="/categories"
            onClick={() => setShowNav(!showNav)}
            role="button"
            onKeyDown={() => setShowNav(!showNav)}
            tabIndex={0}
          >
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/subscribe"
            onClick={() => setShowNav(!showNav)}
            role="button"
            onKeyDown={() => setShowNav(!showNav)}
            tabIndex={0}
          >
            Subscribe
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/faq"
            onClick={() => setShowNav(!showNav)}
            role="button"
            onKeyDown={() => setShowNav(!showNav)}
            tabIndex={0}
          >
            FAQ
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/track"
            onClick={() => setShowNav(!showNav)}
            role="button"
            onKeyDown={() => setShowNav(!showNav)}
            tabIndex={0}
          >
            Track
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" role="button">
            <IconButton to="/cart" aria-label="Show cart items" style={{ color: '#f8f8ff' }}>
              <Badge badgeContent={totalItems} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </NavLink>
        </li>

        <li>
          {location.pathname === '/cart' && totalItems > 0 ? (
            <NavLink onClick={goToCheckout} role="button">
              <span className='checkout_text'>Checkout</span>
              <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </NavLink>
          ) : (
            ''
          )}
        </li>
      </ul>
    </NavMenuStyles>
  );
};

export default Navbar;
