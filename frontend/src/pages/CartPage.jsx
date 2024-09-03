import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
  }, []);

  const handleRemoveFromCart = (id) => {
    console.log('Removing item with id:', id);
    const updatedCart = cart.filter(item => item.id !== id);
    console.log('Updated cart:', updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleBuyNowClick = () => {
    navigate('/checkout', { state: { cart, totalPrice: getTotalPrice() } });
  };

  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <div className="cart-page">
      <button onClick={handleBackClick} className="back-button">
        🡸 
      </button>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h2 className="cart-item-title">{item.title}</h2>
                  <p className="cart-item-price">${item.price}</p>
                </div>
                <button onClick={() => handleRemoveFromCart(item.id)} className="remove-from-cart-button">Remove</button>
              </li>
            ))}
          </ul>
          <h2 className="total-price">Total Price: ${getTotalPrice()}</h2>
          <button onClick={handleBuyNowClick} className="buy-now-button">Buy Now</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
