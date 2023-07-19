const fs = require('fs');

fs.readdir(__dirname, (error, files) => {
  console.log('files:', files);
});
