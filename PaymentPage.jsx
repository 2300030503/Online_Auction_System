import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import './PaymentPage.css';

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [selectedBank, setSelectedBank] = useState('');
  const [showNetBankingForm, setShowNetBankingForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      navigate('/products');
    }, 2000); // Redirect after 2 seconds
  };

  const renderPaymentForm = () => {
    if (!selectedMethod) {
      return <p>Please select a payment method to continue.</p>;
    }

    switch (selectedMethod) {
      case 'card':
        return (
          <div className="payment-form">
            <h2>Credit/Debit Card Payment</h2>
            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="Name on Card" />
            <div className="row">
              <input type="text" placeholder="Expiry Date" />
              <input type="text" placeholder="CVV" />
            </div>
            <button onClick={handlePaymentSuccess}>Submit</button>
          </div>
        );

      case 'upi':
        return (
          <div className="payment-form">
            <h2>UPI Payment</h2>
            <img src="/qrcode.png" alt="Scan QR" className="qr-image" />
            <p>Scan the QR code with any UPI app to proceed.</p>
          </div>
        );

      case 'netbanking':
        return (
          <div className="payment-form">
            <h2>Net Banking</h2>
            <label>Select Bank</label>
            <select
              value={selectedBank}
              onChange={(e) => {
                setSelectedBank(e.target.value);
                setShowNetBankingForm(true);
              }}
            >
              <option value="">-- Select --</option>
              <option value="SBI">SBI</option>
              <option value="HDFC">HDFC</option>
              <option value="ICICI">ICICI</option>
              <option value="Axis">Axis</option>
            </select>

            {showNetBankingForm && (
              <>
                <input type="text" placeholder="Account Number" />
                <input type="text" placeholder="Account Holder Name" />
                <div className="row">
                  <input type="text" placeholder="IFSC Code" />
                  <input type="text" placeholder="Branch Name" />
                </div>
                <button onClick={handlePaymentSuccess}>Proceed</button>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="payment-container">
      <div className="left-panel">
        <div className="confetti-wrapper">
          <Confetti width={windowSize.width / 2} height={windowSize.height} />
        </div>
        <h1>🎉 Congratulations!</h1>
        <p>You are the highest bidder!</p>
        <div className="method-buttons">
          <button onClick={() => setSelectedMethod('card')}>Credit/Debit Card</button>
          <button onClick={() => setSelectedMethod('upi')}>UPI</button>
          <button onClick={() => setSelectedMethod('netbanking')}>Net Banking</button>
        </div>
      </div>

      <div className="right-panel">
        {paymentSuccess ? (
          <div className="payment-success">
            <h2>Payment Successful!</h2>
            <p>Redirecting to products page...</p>
          </div>
        ) : (
          renderPaymentForm()
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
