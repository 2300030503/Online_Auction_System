import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BidProduct = ({ socket }) => {
  const { name } = useParams();
  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('products')) || [];
    const match = stored.find(p => p.name === name);
    setProduct(match);
    setAmount(match?.price || 0);
  }, [name]);

  const handleSubmit = e => {
    e.preventDefault();
    if (amount > Number(product.price)) {
      socket.emit('bidProduct', {
        amount,
        last_bidder: localStorage.getItem("userName"),
        name
      });
      navigate("/products");
    } else {
      setError(true);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className='bidproduct__container'>
      <h2>Place a Bid</h2>
      <img src={product.imageUrl} alt={product.name} width="200" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Starting at: ${product.price}</p>
      {product.vrTourUrl && (
        <a href={product.vrTourUrl} target="_blank" rel="noreferrer">🔍 Virtual Tour</a>
      )}

      <form onSubmit={handleSubmit}>
        <label>Bidding Amount</label>
        {error && <p style={{ color: 'red' }}>Amount must be greater than ${product.price}</p>}
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
        <button>SEND</button>
      </form>
    </div>
  );
};

export default BidProduct;
