import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const helpRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent!\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="welcome__container">
      <header className="welcome__header">
        <div className="logo">AuctionHub<span className="dot">.</span></div>
        <nav className="welcome__nav">
          <ul className="nav-links">
            <li><button onClick={() => scrollToSection(aboutRef)}>About</button></li>
            <li><button onClick={() => scrollToSection(contactRef)}>Contact Us</button></li>
            <li><button onClick={() => scrollToSection(helpRef)}>Help</button></li>
          </ul>
          <div className="profile-icon-btn" onClick={() => navigate('/login')}>
            <PersonOutlineIcon className="profile-icon" />
          </div>
        </nav>
      </header>

      <main className="welcome__main">
        <div className="welcome__left">
          <h1><span className="green-text">Bid Smart,</span> Win Big</h1>
          <h2 className="welcome__subtitle">WELCOME TO THE ONLINE AUCTION SYSTEM</h2>
          <p className="welcome__desc">
            Join thousands of bidders participating in live, competitive auctions.
            Discover, bid, and win your desired items with ease and confidence.
          </p>
          <div className="welcome__buttons">
            <button className="outline-btn" onClick={() => navigate('/signup')}>Create Account</button>
          </div>
        </div>

        <div className="welcome__right">
          <img
            src="https://thumbs.dreamstime.com/b/online-auction-gavel-internet-bidding-web-site-win-buy-item-d-words-wood-block-closing-website-42430139.jpg"
            alt="Online Auction"
            className="cover-img"
          />
        </div>
      </main>

      {/* ABOUT SECTION */}
      <section className="about-section" ref={aboutRef}>
        <h2>About Online Auction Systems</h2>
        <p>
          Online auctions provide a fast, secure, and competitive platform for buyers and sellers worldwide.
          From unique collectibles to modern electronics, users can explore and participate in real-time bidding.
        </p>
        <div className="about-highlights">
          <div className="about-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3105/3105896.png" alt="Trust" />
            <h3>Trusted Platform</h3>
            <p>We prioritize secure bidding and authenticated sellers for user safety.</p>
          </div>
          <div className="about-card">
            <img src="https://cdn-icons-png.flaticon.com/512/9068/9068779.png" alt="Live Bidding" />
            <h3>Live Bidding</h3>
            <p>Bid live with real-time price updates and a countdown timer.</p>
          </div>
          <div className="about-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2099/2099071.png" alt="Variety" />
            <h3>Massive Inventory</h3>
            <p>Explore thousands of products across electronics, fashion, art, and more.</p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section" ref={contactRef}>
        <h2>Contact Us</h2>
        <p>If you have questions about your account, bidding, or listings, we’re here to help!</p>
        <div className="contact-details">
          <div><strong>Email:</strong> support@auctionhub.com</div>
          <div><strong>Phone:</strong> +1 800-555-0199</div>
          <div><strong>Support Hours:</strong> Mon–Sat, 9:00 AM – 6:00 PM</div>
        </div>
        <form className="contact-form-preview" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* HELP SECTION */}
      <section className="help-section" ref={helpRef}>
        <h2>Help Center</h2>
        <p>Need assistance? Here’s how the online auction system works:</p>
        <ul className="help-list">
          <li><strong>Registration:</strong> Create a free account to start bidding on items.</li>
          <li><strong>How Bidding Works:</strong> Place manual bids or set auto-bids. The highest bidder wins when the timer ends.</li>
          <li><strong>Payment:</strong> Securely pay through supported methods after winning an auction.</li>
          <li><strong>Shipping:</strong> The item is shipped by the seller within the provided delivery timeframe.</li>
          <li><strong>Support:</strong> If any issues occur, contact us directly through our Contact Us section.</li>
        </ul>
      </section>
    </div>
  );
};

export default Welcome;
