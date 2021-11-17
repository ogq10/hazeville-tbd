import React from 'react';
import { Link } from 'react-router-dom';
const GPCard = () => {
  return (
    <div>
      <div>
        <div class="flip-card-container">
          <div class="flip-card">
            <div class="card-back">
              <figure>
                <div class="img-bg"></div>
                <img
                  src="https://images.unsplash.com/photo-1571941133054-1093244a78b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80"
                  alt="Disposable Pens"
                />
                <figcaption>Glass Pipes</figcaption>
              </figure>

              <ul class="detail_lines">
                <li class="lines">
                  <Link
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    to="/categories/posh"
                  >
                    Posh Plus XL
                  </Link>
                </li>
                <li class="lines">
                  <Link style={{ textDecoration: 'none', color: 'inherit' }}>
                    Hazeville
                  </Link>
                </li>
                <li class="lines">
                  <Link style={{ textDecoration: 'none', color: 'inherit' }}>
                    Fume Infinity
                  </Link>
                </li>
                <li class="lines">
                  <Link style={{ textDecoration: 'none', color: 'inherit' }}>
                    Loy XL
                  </Link>
                </li>
                <li class="lines">
                  <Link style={{ textDecoration: 'none', color: 'inherit' }}>
                    Vapor Tech Cube
                  </Link>
                </li>
              </ul>
            </div>

            <div class="card-front">
              <button>Glass Pipes</button>
              <figure>
                <div class="img-bg"></div>
                <img
                  src="https://images.unsplash.com/photo-1571941133054-1093244a78b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80"
                  alt="Disposable Pens"
                />
              </figure>

              <div class="design-container">
                <span class="design design--1"></span>
                <span class="design design--2"></span>
                <span class="design design--3"></span>
                <span class="design design--4"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPCard;
