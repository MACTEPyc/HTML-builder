const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');
const readline = require('readline');

const fileName = 'text.txt';
const pathFile = path.join(__dirname, fileName);
const stream = fs.createWriteStream(pathFile);

const rl = readline.createInterface({ 
  input: stdin, 
 });

console.log('Приветствую!')
console.log('Введите любой текст:');

rl.on('line', (line) => {
  if (line != 'exit') {
    stream.write(line + '\r\n');
  } else {
    toExit();
  }
});

rl.on('SIGINT', () => {
  toExit();
});

function toExit() {
  console.log('До скорой встречи!');
  rl.close();
}
