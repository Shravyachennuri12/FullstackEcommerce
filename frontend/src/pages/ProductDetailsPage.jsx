import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productInCart = cart.find(item => item.id === id);
    setIsInCart(!!productInCart);
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    setIsInCart(true);
    navigate('/cart');
  };

  const handleRemoveFromCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    setIsInCart(false);
  };

  const handleBackClick = () => {
    navigate('/product'); 
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details-page">
      <button onClick={handleBackClick} className="back-button">
      🡸  
</button>
      <h1>{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} className="product-image" />
      <p className="product-price">${product.price}</p>
      <p className="product-description">{product.description}</p>
      {isInCart ? (
        <button onClick={handleRemoveFromCart} className="remove-from-cart-button">Remove from Cart</button>
      ) : (
        <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
      )}
    </div>
  );
};

export default ProductDetailsPage;
