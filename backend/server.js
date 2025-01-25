// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/smart-campus', {
  serverSelectionTimeoutMS: 5000, // Adjust the timeout as needed
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define schemas and models
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const maintenanceRequestSchema = new mongoose.Schema({
  issue: String,
  status: String,
});

const inventoryItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

const roomBookingSchema = new mongoose.Schema({
  roomType: String,
  bookingDate: String,
  bookingTime: String,
});

const User = mongoose.model('User', userSchema);
const MaintenanceRequest = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);
const RoomBooking = mongoose.model('RoomBooking', roomBookingSchema);

// Seed initial data
const seedData = async () => {
  try {
    const adminUser = new User({ username: 'admin', password: 'password' });
    await adminUser.save();

    const initialItems = [
      { name: 'Projector', quantity: 5 },
      { name: 'Chairs', quantity: 20 },
      { name: 'Lab Equipment', quantity: 10 },
    ];

    await InventoryItem.insertMany(initialItems);
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();

// Routes
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  const newUser = new User({ username, password });
  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
});

app.get('/inventory', async (req, res) => {
  const items = await InventoryItem.find();
  res.status(200).json(items);
});

app.post('/inventory', async (req, res) => {
  const { name, quantity } = req.body;
  const newItem = new InventoryItem({ name, quantity });
  await newItem.save();
  res.status(201).json(newItem);
});

app.get('/maintenance-requests', async (req, res) => {
  const requests = await MaintenanceRequest.find();
  res.status(200).json(requests);
});

app.post('/maintenance-requests', async (req, res) => {
  const { issue } = req.body;
  const newRequest = new MaintenanceRequest({ issue, status: 'Pending' });
  await newRequest.save();
  res.status(201).json(newRequest);
});

app.post('/room-booking', async (req, res) => {
  const { roomType, bookingDate, bookingTime } = req.body;
  const newBooking = new RoomBooking({ roomType, bookingDate, bookingTime });
  await newBooking.save();
  res.status(201).json(newBooking);
});

app.get('/room-bookings', async (req, res) => {
  const bookings = await RoomBooking.find();
  res.status(200).json(bookings);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});