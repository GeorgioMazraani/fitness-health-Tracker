const crypto = require('crypto');

function generateSecret() {
  const secretKey = crypto.randomBytes(64).toString('hex');
  console.log(`Generated Secret Key: ${secretKey}`);
}

generateSecret();
