const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(bodyParser.json());

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let liveBids = [];
let payments = [];

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('registerUser', (email) => {
    socket.data.email = email;
  });

  socket.on('joinProductRoom', (productId) => {
    socket.join(productId);
    const productBids = liveBids
      .filter((bid) => bid.productId === productId)
      .sort((a, b) => b.amount - a.amount);
    socket.emit('initialBids', productBids);
  });

  socket.on('placeBid', ({ productId, amount }) => {
    const bid = {
      productId,
      amount: parseFloat(amount),
      email: socket.data.email || 'Anonymous'
    };

    console.log('Received bid:', bid);
    liveBids.push(bid);
    io.to(productId).emit('bidUpdate', bid);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

app.post('/api/payment', (req, res) => {
  const { email, product, amount, paymentMethod, paymentDetails } = req.body;
  const payment = {
    email,
    product,
    amount,
    paymentMethod,
    paymentDetails,
    timestamp: new Date().toISOString()
  };
  payments.push(payment);
  console.log('Payment recorded:', payment);
  res.status(200).json({ message: 'Payment successful', payment });
});

app.get('/api/payment-history', (req, res) => {
  res.json(payments);
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
