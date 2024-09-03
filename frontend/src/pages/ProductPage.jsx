import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Productpage.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [filteredProducts, setFilteredProducts] = useState([]); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
        setFilteredProducts(response.data.products); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`); 
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const lowercasedQuery = query.toLowerCase();
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); 
    }
  };

  return (
    <div className="product-page">
      <div className="page-header">
        <h1>Products</h1>
        <button onClick={handleHomeClick} className="home-button">
          Home
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Here"
          value={searchQuery}
          onChange={handleSearchChange} 
        />
        <button>
          🔍
        </button>
      </div>

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="product-item"
            >
              <img 
                src={product.thumbnail} 
                alt={product.title} 
                className="product-image" 
                onClick={() => handleProductClick(product.id)}
              />
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">${product.price}</p>
              <p className="product-description">{product.description}</p>
              <button 
                onClick={() => handleProductClick(product.id)} 
                className="view-details-button"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
