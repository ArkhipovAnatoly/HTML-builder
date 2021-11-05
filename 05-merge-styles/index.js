const path = require('path');
const { readdir } = require('fs/promises');
const fs = require('fs');

const sourceFolderName = 'styles';
const outFileName = 'bundle.css';
const outFolderName = 'project-dist';
const correctFileExt = '.css';
const outPath = path.resolve(__dirname, outFolderName);
const outFilePath = path.join(outPath, outFileName);
const sourceFolderPath = path.resolve(__dirname, sourceFolderName);

function mergeFiles() {
  const writeableStream = fs.createWriteStream(outFilePath);
  readdir(sourceFolderPath, { withFileTypes: true }).then((files) => {
    files.forEach((file) => {
      const fileExt = path.extname(file.name);
      const currentFilePath = path.join(sourceFolderPath, file.name);
      const readableStream = fs.createReadStream(currentFilePath, 'utf8');
      if (fileExt === correctFileExt) {
        readableStream.pipe(writeableStream);
      }
    });
  });
}

mergeFiles();
