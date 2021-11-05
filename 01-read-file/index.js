const path = require('path');
const fs = require('fs');

const filePath = path.resolve(__dirname, 'text.txt');
const stream = fs.ReadStream(filePath, 'utf8');

stream.on('data', function (data) {
  if (data != null) {
    console.log(data);
  }
});
