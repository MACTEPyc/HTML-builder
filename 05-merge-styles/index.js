const { readdir } = require('fs').promises;
const fs = require('fs');
const path = require('path');

const fromDir = 'styles';
const toDir = 'project-dist';
const pathFromDir = path.join(__dirname, fromDir);
const pathToDir = path.join(__dirname, toDir);
const newFile = path.join(pathToDir, 'bundle.css');
const toStream = fs.createWriteStream(newFile);


const arr = [];

(async function (dir) {
  try {
    const files = await readdir(dir, { withFileTypes: true });
    for (const file of files) {
      const extName = path.extname(file.name);
      if (!file.isDirectory() && extName == '.css') {
        const pathFile = path.join(pathFromDir, file.name);
        const stream = fs.createReadStream(pathFile, 'utf-8');
        stream.on('readable', () => {
          const data = stream.read();
          if (data != null) { 
            arr.push(data); 
          }
        });
      }
    }
    arr.forEach(item => {
      toStream.write(item + '\r\n');
    });
  } catch(err) {
    console.error(err);
  }
})(pathFromDir);