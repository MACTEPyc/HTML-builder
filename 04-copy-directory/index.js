const { readdir, copyFile, mkdir } = require('fs').promises;
const path = require('path');

const nameDir = 'files';
const copyDir = 'files-copy';
const pathSourceDir = path.join(__dirname, nameDir);
const pathDestinationDir = path.join(__dirname, copyDir);

mkdir(pathDestinationDir, { recursive: true });

(async function (dir) {
  try {
    const files = await readdir(dir);
    for (const file of files) {
      const pathSourceFile = path.join(pathSourceDir, file);
      const pathDestinationFile = path.join(pathDestinationDir, file);
      console.log(`Copy file "${pathSourceFile}" to "${pathDestinationFile}".`);
      await copyFile(pathSourceFile, pathDestinationFile);
    }
  } catch(err) {
    console.error(err);
  }
})(pathSourceDir);
