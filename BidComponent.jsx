// BidComponent.jsx
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

const BidComponent = ({ productName }) => {
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    socket.emit('joinRoom', productName);

    socket.on('loadBids', (loadedBids) => {
      setBids(loadedBids);
    });

    socket.on('newBid', (bid) => {
      setBids((prev) => [...prev, bid]);
    });

    return () => {
      socket.off('loadBids');
      socket.off('newBid');
    };
  }, [productName]);

  const placeBid = () => {
    const bid = {
      amount: bidAmount,
      bidder: 'User' + Math.floor(Math.random() * 1000),
      timestamp: new Date().toLocaleTimeString()
    };

    socket.emit('placeBid', { productName, bid });
    setBidAmount('');
  };

  return (
    <div>
      <h2>Live Bidding for {productName}</h2>
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Enter your bid"
      />
      <button onClick={placeBid}>Place Bid</button>

      <ul>
        {bids.map((b, index) => (
          <li key={index}>
            💰 ₹{b.amount} by {b.bidder} at {b.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BidComponent;