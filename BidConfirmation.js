import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Products.css';

const BidConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, bidAmount } = location.state || {};

  if (!product || !bidAmount) {
    return <div>No bid confirmation data available.</div>;
  }

  return (
    <div className="confirmation-page">
      <h1>🎉 Congratulations!</h1>
      <p>You won the auction for:</p>
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} style={{ width: '400px', borderRadius: '10px' }} />
      <p><strong>Your Winning Bid:</strong> ${bidAmount}</p>
      <button className="back-to-products-button" onClick={() => navigate("/products")}>
        Back to Products
      </button>
    </div>
  );
};

export default BidConfirmation;
