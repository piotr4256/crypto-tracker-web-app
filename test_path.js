const fs = require('fs');
try {
  console.log(fs.realpathSync('C:/Users/ciesl/Documents/antygravity/crypto-pulse-web-app/crypto-pulse-web-app/venv/Scripts/python.exe'));
} catch (e) {
  console.error(e.message);
}
