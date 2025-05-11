// src/components/AddProduct.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Products.css';

const AddProduct = ({ socket }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    imageUrl: '',
    vrTourUrl: '',
    videoUrl: ''
  });

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const productWithOwner = {
      ...formData,
      owner: localStorage.getItem("userName") || "unknown",
      last_bidder: "",
    };

    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = [...existingProducts, productWithOwner];
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    if (socket) {
      socket.emit('addProduct', productWithOwner);
    }

    navigate("/products");
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f0f4f8, #d9e4f5)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem"
      }}
    >
      <div className="addproduct__container">
        <h2>➕ Add a New Product</h2>
        <form className="addProduct__form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label>Name</label>
            <input type="text" name="name" required onChange={handleChange} />
          </div>

          <div className="form__group">
            <label>Price ($)</label>
            <input type="number" name="price" required onChange={handleChange} />
          </div>

          <div className="form__group">
            <label>Description</label>
            <textarea name="description" required onChange={handleChange} rows="5" />
          </div>

          <div className="form__group">
            <label>Category</label>
            <input type="text" name="category" required onChange={handleChange} />
          </div>

          <div className="form__group">
            <label>Image URL</label>
            <input type="url" name="imageUrl" required onChange={handleChange} />
          </div>

          <div className="form__group">
            <label>VR Tour URL (.glb or .gltf for 360° view)</label>
            <input type="url" name="vrTourUrl" onChange={handleChange} />
          </div>

          <div className="form__group">
            <label>Video URL (optional)</label>
            <input type="url" name="videoUrl" onChange={handleChange} />
          </div>

          <button type="submit" className="addProduct__cta">Add Product</button>
        </form>

        {formData.imageUrl && (
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <h4>📷 Image Preview</h4>
            <img
              src={formData.imageUrl}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '300px',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
