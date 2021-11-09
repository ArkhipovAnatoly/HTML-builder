const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { stdin, stdout } = require('process');
const fileName = 'test.txt';
const greeting = 'Welcome,friend! Type something...';
const farewell = 'Goodbye!';
const keyWord = 'exit';

const filePath = path.resolve(__dirname, fileName);
const writeableStream = fs.createWriteStream(filePath);

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

rl.on('SIGINT', function () {
  console.log(`\n${farewell}`);
  rl.close();
});
rl.on('line', function (data) {
  if (data === keyWord) {
    console.log(`\n${farewell}`);
    rl.close();
  }
});

console.log(greeting + '\n');
stdin.pipe(writeableStream);
