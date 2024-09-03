import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate(); 
  const { cart, totalPrice } = state || { cart: [], totalPrice: '0.00' };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="checkout-page">
      <button onClick={handleBackClick} className="back-button">
        🡸 
      </button>
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <h2>Order Summary</h2>
          <ul className="checkout-list">
            {cart.map((item) => (
              <li key={item.id} className="checkout-item">
                <img src={item.thumbnail} alt={item.title} className="checkout-item-image" />
                <div className="checkout-item-details">
                  <h1 className="checkout-item-title">{item.title}</h1>
                  <h2 className="checkout-item-price">${item.price}</h2>
                </div>
              </li>
            ))}
          </ul>
          <h2 className="checkout-total-price">Total Price: ${totalPrice}</h2>
          <button className="checkout-button">Complete oPurchase</button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
