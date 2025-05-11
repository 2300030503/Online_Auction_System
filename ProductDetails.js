import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Products.css';
import io from 'socket.io-client';

const socket = io("http://localhost:4000"); // Ensure this matches your backend port

const ProductDetails = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [bids, setBids] = useState([]);
  const [timer, setTimer] = useState(60);
  const [userEmail, setUserEmail] = useState('');

  // Get email from localStorage (after login)
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      alert('You must be logged in to place a bid.');
      navigate('/login');
      return;
    }
    setUserEmail(email);
    socket.emit('registerUser', email);
  }, [navigate]);

  // Load product details from localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const foundProduct = storedProducts.find(
      (p) => p.name === decodeURIComponent(productName)
    );
    setProduct(foundProduct);
  }, [productName]);

  // Socket setup
  useEffect(() => {
    if (!productName) return;

    const decodedName = decodeURIComponent(productName);
    socket.emit('joinProductRoom', decodedName); // FIXED: matching backend

    socket.on('initialBids', (loadedBids) => {
      const sorted = [...loadedBids].sort((a, b) => b.amount - a.amount);
      setBids(sorted);
    });

    socket.on('bidUpdate', (bid) => {
      if (bid.productId === decodedName) { // FIXED: match productId
        setBids((prev) => {
          const updated = [...prev, bid].sort((a, b) => b.amount - a.amount);
          return updated;
        });
      }
    });

    return () => {
      socket.off('initialBids');
      socket.off('bidUpdate');
    };
  }, [productName]);

  // Timer logic
  useEffect(() => {
    if (timer <= 0) {
      const highestBid = bids.reduce((max, bid) =>
        parseFloat(bid.amount) > parseFloat(max.amount) ? bid : max,
        { amount: 0, email: null }
      );

      if (highestBid.email === userEmail) {
        navigate("/payment", {
          state: {
            product,
            bidAmount: highestBid.amount
          }
        });
      } else {
        alert("Auction ended! You are not the highest bidder.");
        navigate("/products");
      }
    }

    const interval = timer > 0 && setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, bids, product, navigate, userEmail]);

  const handlePlaceBid = () => {
    if (!bidAmount) return alert("Please enter a bid amount.");
    if (parseFloat(bidAmount) <= parseFloat(product.price)) {
      return alert(`Bid must be higher than starting price $${product.price}`);
    }

    const newBid = {
      productId: decodeURIComponent(productName), // FIXED: match backend
      amount: bidAmount,
      email: userEmail
    };

    socket.emit("placeBid", newBid); // FIXED: simplified payload
    setShowBidModal(false);
    setBidAmount('');
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Owner:</strong> {product.owner}</p>

      <h3>⏳ Time left: {timer} seconds</h3>

      <button className="place-bid-button" onClick={() => setShowBidModal(true)}>
        💰 Place a Bid
      </button>

      {showBidModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Place Your Bid</h3>
            <input
              type="number"
              placeholder="Enter bid amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handlePlaceBid}>Submit Bid</button>
              <button onClick={() => setShowBidModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="live-bids-section">
        <h4>📢 Live Bids:</h4>
        <ul className="live-bids-list">
          {bids.length === 0 ? (
            <li>No bids yet. Be the first!</li>
          ) : (
            bids.map((bid, index) => (
              <li key={index}>
                💲${bid.amount} by <strong>{bid.email}</strong>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails;
