import React from 'react';
import { Route, Routes } from 'react-router-dom';
import socketIO from 'socket.io-client';

import Home from './Home';
import AddProduct from './AddProduct';
import BidProduct from './BidProduct';
import Products from './Products';
import ProductDetails from './ProductDetails';
import Welcome from './Welcome';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import BidConfirmation from './BidConfirmation';
import BidComponent from './BidComponent';
import PaymentPage from './PaymentPage'; // ✅ Correct import

const socket = socketIO.connect("http://localhost:4000");

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<AddProduct socket={socket} />} />
        <Route path="/products/bid/:name/:price" element={<BidProduct socket={socket} />} />
        <Route path="/product/:productName" element={<ProductDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/bid-confirmation" element={<BidConfirmation />} />
        <Route path="/demo-bid" element={<BidComponent productName="Smartphone" />} />
        <Route path="/payment" element={<PaymentPage />} /> {/* ✅ Fixed here */}
      </Routes>
    </div>
  );
}

export default App;
