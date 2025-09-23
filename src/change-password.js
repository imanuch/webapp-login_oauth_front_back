
  const bcrypt = require('bcryptjs');

  const password = 'StrongPass123@3'
  const hash = bcrypt.hashSync(password, 10);
 console.log('Hash', hash)


  // Usage: node change-password.js
  const email = 'test@example.com';
  const newPassword = 'StrongPass123@3';