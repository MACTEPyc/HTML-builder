const { readdir } = require('fs').promises;
const { stat } = require('fs');
const path = require('path');

const nameDir = 'secret-folder';
const pathDir = path.join(__dirname, nameDir);

(async function (dir) {
  try {
    const files = await readdir(dir, { withFileTypes: true });
    for (const file of files) {
      if (!file.isDirectory()) {
        const pathFile = path.join(pathDir, file.name);
        stat(pathFile, (err, stats) => {
          const extName = path.extname(file.name);
          const fileName = path.basename(pathFile, extName);
          const size = stats.size;
          console.log(`${fileName} - ${extName.slice(1)} - ${size}kb`);
        });
      }
  }
  } catch(err) {
    console.error(err);
  }
})(pathDir);

