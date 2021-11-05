const path = require('path');
const { readdir } = require('fs/promises');
const { stat } = require('fs');
let folderPath = path.resolve(__dirname, 'secret-folder');
const KB = 1024;

function readFiles(folderPath) {
  readdir(folderPath, { withFileTypes: true }).then((files) => {
    files.forEach((file) => {
      let filePath = path.join(folderPath, file.name);
      let fileExt = path.extname(file.name);
      let fileName = path.basename(file.name, fileExt);
      let fileSize = 0;
      let result = '';

      if (fileExt === '') {
        fileName = 'unnamed';
        fileExt = file.name;
      }
      stat(filePath, (err, stats) => {
        if (stats.isFile()) {
          fileSize = stats.size / KB;
          if (fileSize != 0) {
            fileSize = fileSize.toFixed(3);
          }
          fileExt = fileExt.split('.');
          result = `${fileName} - ${fileExt[1]} - ${fileSize}kb`;
          console.log(result);
        } else {
          let innerFolderPath = path.join(folderPath, file.name);
          readFiles(innerFolderPath);
        }
      });
    });
  });
}

readFiles(folderPath);
