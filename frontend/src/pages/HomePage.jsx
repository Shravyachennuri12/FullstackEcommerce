import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products?page=${page}&limit=10`);
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.total / 10));
        const uniqueCategories = [...new Set(response.data.products.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [page]);

  const handleShopNowClick = () => {
    navigate('/product');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleSignOutClick = () => {
    
    localStorage.removeItem('token'); 
    navigate('/'); 
  };

  return (
    <div className="home-page">
      <header className="header">
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#signout" onClick={handleSignOutClick}>Sign out</a>
        </nav>
        <div className="logo">Shopify</div>
        <div className="cart-icon" onClick={handleCartClick}>
          🛒
        </div>
      </header>

      <section className="banner">
        <h1>Welcome to MyShop</h1>
        <p>Find the best products at unbeatable prices!</p>
        <button onClick={handleShopNowClick}>Shop Now</button>
      </section>

      <footer className="footer">
        <p>&copy; 2024 MyShop. All rights reserved.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
