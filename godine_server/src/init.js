const fs = require('fs');
const path = require('path');

// Function to ensure the upload directory exists
function ensureUploadsDirectoryExists() {
  const uploadDir = path.join('public/upload');

  // Check if the directory exists, create it if it doesn't
  if (!fs.existsSync(uploadDir)) {
    try {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log('Upload directory created successfully.');
    } catch (error) {
      console.error('Error creating upload directory:', error);
    }
  }
}

module.exports = { ensureUploadsDirectoryExists };
