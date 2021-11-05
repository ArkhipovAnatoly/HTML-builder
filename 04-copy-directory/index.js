const path = require('path');
const { mkdir, readdir, copyFile } = require('fs/promises');

const copyDirectoryName = 'files-copy';
const sourceDirectoryName = 'files';
const sourcePath = path.resolve(__dirname, sourceDirectoryName);
const destinationPath = path.resolve(__dirname, copyDirectoryName);

function copyDirectory() {
  mkdir(destinationPath, { recursive: true }).then(() => {
    readdir(sourcePath, { withFileTypes: true }).then((files) => {
      files.forEach((file) => {
        let currentFilePath = path.join(sourcePath, file.name);
        let destinationFilePath = path.join(destinationPath, file.name);
        copyFile(currentFilePath, destinationFilePath);
      });
    });
    console.log('Completed!');
  });
}

copyDirectory();
