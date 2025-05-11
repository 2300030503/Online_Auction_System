import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ header, socket }) => {
  const [notification, setNotification] = useState("");

  useEffect(() => {
    socket.on("addProductResponse", data => {
      setNotification(`@${data.owner} added ${data.name} - $${data.price}`);
    });
    socket.on("bidProductResponse", data => {
      setNotification(`@${data.last_bidder} bid $${data.amount} for ${data.name}`);
    });
  }, [socket]);

  return (
    <nav className='navbar'>
      <div className='header'>
        <h2>{header}</h2>
      </div>
      <div className="nav-links">
        <Link to="/products">🏠 Products</Link> | 
        <Link to="/add">➕ Add Product</Link>
      </div>
      <p style={{ color: 'red' }}>{notification}</p>
    </nav>
  );
};

export default Nav;
