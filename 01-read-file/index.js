const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const { stdin, stdout } = require('process');

const fileName = 'text.txt';

const pathFile = path.join(__dirname, fileName);

const stream = new fs.ReadStream(pathFile, {encoding: 'utf-8'});
stream.on('readable', () => {
  const data = stream.read();
  if (data != null) { console.log(data); }
});

stream.on('error', (err) => {
  if (err.code == 'ENOENT') {
    console.log(`файл "${fileName}" не найден`);
  } else {
    console.error(err);
  }
});
