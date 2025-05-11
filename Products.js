// src/components/Products.js
import React, { useEffect, useState } from 'react';
import './Products.css';
import EditButton from './EditButton';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const predefinedCategories = ['All', 'Cars', 'Books', 'Jewelry', 'Art', 'Gadgets'];

  const fallbackProducts = [/* unchanged fallback products as before */];

  useEffect(() => {
    const localProducts = JSON.parse(localStorage.getItem('products'));

    if (localProducts && localProducts.length > 0) {
      setProducts(localProducts);
    } else {
      fetch('http://localhost:4000/api')
        .then(res => res.json())
        .then(data => {
          let combinedProducts = data.products && data.products.length > 0
            ? [...data.products]
            : [];

          const categoriesInData = new Set(combinedProducts.map(p => p.category?.toLowerCase()));
          fallbackProducts.forEach(fp => {
            if (!categoriesInData.has(fp.category?.toLowerCase())) {
              combinedProducts.push(fp);
            }
          });

          setProducts(combinedProducts);
          localStorage.setItem('products', JSON.stringify(combinedProducts));
        })
        .catch(() => {
          setProducts(fallbackProducts);
          localStorage.setItem('products', JSON.stringify(fallbackProducts));
        });
    }
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesCategory =
      activeCategory === 'All' || !activeCategory || p.category?.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleProductClick = (product) => {
    navigate(`/product/${encodeURIComponent(product.name)}`);
  };

  const handleAddProduct = () => {
    navigate('/products/add');
  };

  return (
    <div className="products-listing">
      <div className="products-header">
        <h2>🛍️ Browse Products</h2>
        <button className="add-product-button" onClick={handleAddProduct}>
          ➕ Add Product
        </button>
      </div>

      <input
        type="text"
        placeholder="🔍 Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="category-buttons">
        {predefinedCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`category-button ${cat === activeCategory ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="scroll-container">
        {filteredProducts.length === 0 ? (
          <p className="not-found">No products found in this category.</p>
        ) : (
          filteredProducts.map(product => (
            <div
              key={product.name}
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <p>{product.category}</p>
              <EditButton product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
