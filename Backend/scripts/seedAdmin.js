
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import User model
const User = require('../models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/matrimonial')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const createAdminUser = async () => {
  try {
    // Check if admin user already exists
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_DEFAULT_PASSWORD || 'admin123', 
      salt
    );
    
    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: adminEmail,
      password: hashedPassword,
      phone: '1234567890',
      role: 'admin',
      isActive: true
    });
    
    await adminUser.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
};

createAdminUser();
