const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
const {User} = require('./models/User');
dotenv.config();

async function seedDatabase() {

  try {

  // Define sample admin with hashed passwords
  
  const adminData  = {
      firstName: 'admin',
      lastName: 'User',
      email: 'admin@test.com',
      password: await bcrypt.hash('adminpassword', 10),
      isAdmin: true,
      isVerified:true
    };

    await User.create(adminData);
  
  console.log('Database seeded with admin successfully.');
} catch (error) {
  console.error(error);
  // res.status(500).json({ error: 'Internal Server Error' });
}
}

// Run the seeder function
seedDatabase();

module.exports = seedDatabase