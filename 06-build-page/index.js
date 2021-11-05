const path = require('path');
const { mkdir, readdir, copyFile } = require('fs/promises');
const fs = require('fs');
const outFolderName = 'project-dist';
const outStyleFileName = 'style.css';
const outFolderPath = path.resolve(__dirname, outFolderName);
const srcStyleFilePath = path.resolve(__dirname, 'styles');
const distStyleFilePath = path.join(outFolderPath, outStyleFileName);
const assetsSourcePath = path.resolve(__dirname, 'assets');
const assetsDistPath = path.join(outFolderPath, 'assets');
const templateFilePath = path.resolve(__dirname, 'template.html');
const componentsPath = path.resolve(__dirname, 'components');
const htmlDistPath = path.join(outFolderPath, 'index.html');

let array = [];
let filesCount = 0;

function copyDirectory(srcDirPath, distDirPath) {
  mkdir(outFolderPath, { recursive: true }).then(() => {
    mkdir(distDirPath, { recursive: true }).then(() => {
      readdir(srcDirPath, { withFileTypes: true }).then((files) => {
        files.forEach((file) => {
          if (file.isDirectory()) {
            let distPath = path.join(distDirPath, file.name);
            let dirSrc = path.join(srcDirPath, file.name);
            let dirDist = path.join(distDirPath, file.name);
            mkdir(distPath, { recursive: true });
            copyFiles(dirSrc, dirDist);
          }
        });
      });
    });
  });
}
function copyFiles(dirSrc, dirDist) {
  readdir(dirSrc, { withFileTypes: true }).then((files) => {
    files.forEach((file) => {
      if (file.isFile()) {
        let srcPath = path.join(dirSrc, file.name);
        let distPath = path.join(dirDist, file.name);
        copyFile(srcPath, distPath);
      }
    });
  });
}

function mergeCssFiles(srcDir, distDir) {
  const writeableStream = fs.createWriteStream(distDir);
  readdir(srcDir, { withFileTypes: true }).then((files) => {
    files.forEach((file) => {
      const currentFilePath = path.join(srcDir, file.name);
      const readableStream = fs.createReadStream(currentFilePath, 'utf8');
      readableStream.pipe(writeableStream);
    });
  });
}

function createFile() {
  fs.readFile(templateFilePath, function (err, data) {
    array = data.toString().split('\n');
    array.forEach((el, index) => {
      readdir(componentsPath, { withFileTypes: true }).then((files) => {
        files.forEach((file) => {
          let filePath = path.join(componentsPath, file.name);
          let fileExt = path.extname(file.name);
          let fileName = path.basename(file.name, fileExt);
          let template = `{{${fileName}}}`;
          if (el.trim() == template) {
            fs.readFile(filePath, function (err, data) {
              array.splice(index, 1, data.toString());
              filesCount++;
              if (filesCount == files.length) {
                const writeStream = fs.createWriteStream(htmlDistPath);
                writeStream.write(array.join('\n'));
              }
            });
          }
        });
      });
    });
  });
}

copyDirectory(assetsSourcePath, assetsDistPath);
mergeCssFiles(srcStyleFilePath, distStyleFilePath);
createFile();
